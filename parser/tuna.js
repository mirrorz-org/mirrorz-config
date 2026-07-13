const tunasync = require("./tunasync");
const options = require("./options");
const isoinfo = require("./isoinfo");
const loadSite = require("./site");

module.exports = async function (siteSource) {
  const site = await loadSite(siteSource);
  let mirrors = await tunasync("https://mirrors.tuna.tsinghua.edu.cn/static/tunasync.json");
  mirrors = await options("https://mirrors.tuna.tsinghua.edu.cn/static/js/options.json", mirrors);
  const info = await isoinfo("https://mirrors.tuna.tsinghua.edu.cn/static/status/isoinfo.json");

  return {
    site,
    info,
    mirrors,
  }
};
