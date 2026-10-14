const tunasync = require("../../parser/tunasync");
const isoinfo = require("../../parser/isoinfo");
const cname = require("../../parser/utils").cname;
const siteData = require("./cqu.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  let mirrors = await tunasync("https://mirrors-metadata.cqulug.club/tunasync.json");
  mirrors = await meta("https://mirrors-metadata.cqulug.club/local_data.json", mirrors);
  const info = await isoinfo("https://mirrors-metadata.cqulug.club/isoinfo.json");

  return {
    site,
    info,
    mirrors,
  };
};

async function meta(metaUrl, mirrors) {
  const metas = await (await fetch(metaUrl)).json();
  const name_func = await cname();
  const existing = new Map(mirrors.map((mirror) => [mirror.cname, mirror]));

  for (const mirror of mirrors) {
    const name = mirror.options_name ?? mirror.cname;
    const meta = metas[name];
    if (!meta) continue;

    mirror.desc = mirror.desc ?? meta.desc;
    mirror.upstream = mirror.upstream ?? meta.upstream;
    mirror.help = mirror.help ?? meta.helpUrl ?? "/mirrors/" + name;
    if (meta.gitRepo) {
      mirror.url = "/git" + mirror.url;
    }
  }

  for (const [name, meta] of Object.entries(metas)) {
    if (!meta.storageType || meta.storageType === "mirror") continue;

    let status, message;
    switch (meta.storageType) {
      case "campusProxy":
        status = "R";
        message = "校内反向代理，校外重定向";
        break;
      case "cache":
        status = "C";
        break;
      case "redirect":
        status = "R";
        break;
      default:
        continue;
    }

    const canonicalName = name_func(name);
    const mirror = existing.get(canonicalName);
    const fields = {
      cname: canonicalName,
      url: mirror?.url ?? (meta.gitRepo ? "/git/" : "/") + name,
      upstream: meta.upstream,
      help: meta.helpUrl ?? "/mirrors/" + name,
      status,
      desc: (meta.desc ?? "") + (message ? " - " + message : ""),
    };
    if (mirror) {
      Object.assign(mirror, fields);
    } else {
      mirrors.push(fields);
      existing.set(canonicalName, fields);
    }
  }

  return mirrors;
}
