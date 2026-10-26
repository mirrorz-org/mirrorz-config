const cname = require("./utils").cname;

const size = function (bytes) {
  const mib = bytes / 1024 / 1024;
  if (mib < 1024) {
    return mib.toFixed(2) + " MiB";
  }
  const gib = mib / 1024;
  if (gib < 1024) {
    return gib.toFixed(2) + " GiB";
  }
  const tib = gib / 1024;
  return tib.toFixed(2) + " TiB";
};

module.exports = async function (homepageURL, yukiURL) {
  const name_func = await cname();
  const response = await fetch(homepageURL);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${homepageURL}: ${response.status}`);
  }
  const homepageHTML = await response.text();
  let yukiMeta = await fetch(yukiURL);
  if (yukiMeta.ok) {
    yukiMeta = await yukiMeta.json();
  } else {
    yukiMeta = null;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(homepageHTML, "text/html");
  const table = doc.querySelector("#file-table");
  if (!table) {
    throw new Error(`Missing xtom directory listing: ${homepageURL}`);
  }
  const links = Array.from(table.querySelectorAll("tbody tr:not(#parent-dir) td:first-child a"));
  const hashtable = new Map();
  const mirrors = links.filter((link) => {
    const href = link.getAttribute("href");
    return href && /^\/[^/]+\/$/.test(href);
  }).map((link, index) => {
    const url = link.getAttribute("href");
    const name = url.slice(1, -1);
    hashtable.set(name, index);
    return {
      cname: name_func(name),
      url,
      status: "U",
    };
  });

  // handling yuki
  if (yukiMeta) {
    yukiMeta.map((item) => {
      const index = hashtable.get(item.name);
      if (index === undefined) {
        return;
      }
      const next_run = item.nextRun;
      const last_success = item.lastSuccess;
      const prev_run = item.prevRun;
      if (next_run < 0) {
        mirrors[index]["status"] = "P";
      } else if (item.syncing) {
        mirrors[index]["status"] = "Y" + prev_run;
        if (last_success) {
          mirrors[index]["status"] += "O" + last_success;
        }
      } else if (item.exitCode == 0) {
        mirrors[index]["status"] = "S" + last_success;
      } else {
        mirrors[index]["status"] = "F" + prev_run;
        if (last_success) {
          mirrors[index]["status"] += "O" + last_success;
        }
      }
      if (next_run > 0) {
        mirrors[index]["status"] += "X" + next_run;
      }
      if (Number.isFinite(item.size) && item.size >= 0) {
        mirrors[index]["size"] = size(item.size);
      }
      mirrors[index]["upstream"] = item.upstream;
    });
  }

  return {
    info: [],
    mirrors,
  };
};
