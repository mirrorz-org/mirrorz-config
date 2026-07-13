const lint = require("./lint");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

function isNodeRuntime() {
  return typeof process !== "undefined" && !!process.versions?.node;
}

function isUrlUnderBase(requestUrl, baseUrl) {
  if (requestUrl.origin !== baseUrl.origin) {
    return false;
  }
  if (baseUrl.pathname === "/") {
    return true;
  }

  const normalizedBase = baseUrl.pathname.endsWith("/")
    ? baseUrl.pathname
    : `${baseUrl.pathname}/`;
  return (
    requestUrl.pathname === baseUrl.pathname ||
    requestUrl.pathname.startsWith(normalizedBase)
  );
}

function localPathForUrl(requestUrl, baseUrl, localRootDir) {
  if (!isUrlUnderBase(requestUrl, baseUrl)) {
    return null;
  }

  const basePath = baseUrl.pathname.endsWith("/")
    ? baseUrl.pathname
    : `${baseUrl.pathname}/`;
  const relativePath = requestUrl.pathname.startsWith(basePath)
    ? requestUrl.pathname.slice(basePath.length)
    : requestUrl.pathname.slice(baseUrl.pathname.length);

  const localRoot = path.resolve(localRootDir);
  const candidate = path.resolve(localRoot, `.${path.sep}${relativePath}`);

  const rel = path.relative(localRoot, candidate);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    return null;
  }

  return candidate;
}

const init = (config, mirrorzRepo) => {
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  global.DOMParser = new JSDOM().window.DOMParser;

  Timeout = require("await-timeout");
  const timeout = 15000;
  global.Timeout = Timeout;
  global.timeout = timeout;

  fetch_extra = require("node-fetch-extra");
  const headers = new fetch_extra.Headers({
    "User-Agent": `mirrorz-parser/1.0 (+https://github.com/mirrorz-org/mirrorz-parser) ${config.url} ${mirrorzRepo}`,
  });
  async function fetchV6First(u, opt) {
    const url = typeof u === "string" ? u : (u?.url ?? String(u));
    const localFetchRoot = isNodeRuntime()
      ? process.env.MIRRORZ_LOCAL_FETCH_FILE
      : undefined;

    if (localFetchRoot) {
      /* A hack for more reliable local file fetching on mirrorz server */
      const requestUrl = new URL(url, config.url);
      const baseUrl = new URL(config.url);
      const localPath = localPathForUrl(requestUrl, baseUrl, localFetchRoot);
      if (localPath) {
        console.log(`Accessing local file: ${localPath}`)
        const content = await readFile(localPath);
        return new fetch_extra.Response(content, {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
    }

    const mkTimeoutErr = (label, ms) =>
      new Error(`fetchV6First ${label} timeout after ${ms}ms: ${url}`);

    const v6ms = Math.floor(timeout / 10);
    const fbms = Math.floor(timeout / 3);

    let v6err;
    try {
      return await Timeout.wrap(
        fetch_extra(u, { ...opt, family: 6, headers }),
        v6ms,
        mkTimeoutErr("(IPv6)", v6ms),
      );
    } catch (e) {
      v6err = e;
    }

    try {
      return await Timeout.wrap(
        fetch_extra(u, { ...opt, headers }),
        fbms,
        mkTimeoutErr("(fallback)", fbms),
      );
    } catch (fberr) {
      const err = new Error(
        `fetchV6First failed for ${url}\n` +
          `  IPv6 attempt error: ${v6err?.stack || v6err}\n` +
          `  Fallback attempt error: ${fberr?.stack || fberr}`,
      );
      err.cause = fberr; // keeps the final failure as the cause
      err.attempts = [v6err, fberr];
      throw err;
    }
  }
  global.fetch = fetchV6First;
};
const load = async (source) => {
  if (typeof source == "string") {
    try {
      const resp = await fetch(source);
      const json = await resp.json().catch((_) => null);
      if (json === null) return null;
      return lint(json);
    } catch (e) {
      return null;
    }
  } else {
    try {
      return await Timeout.wrap(source(), timeout, "Timeout").catch(() => null);
    } catch (e) {
      return null;
    }
  }
};

module.exports = { init, load };
