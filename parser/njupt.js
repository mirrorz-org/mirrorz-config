const tunasync = require("./tunasync");
const isoinfo = require("./isoinfo");
const loadSite = require("./site");

module.exports = async function (siteSource) {
  const site = await loadSite(siteSource);
  const info = await isoinfo("https://mirrors.njupt.edu.cn/isoinfo.json");
  let mirrors = await tunasync("https://mirrors.njupt.edu.cn/mirrordsync.json");

  for (const m of mirrors) {
    m["help"] = "/help" + m.url;
  }

  return {
    site,
    info,
    mirrors,
  }
};
