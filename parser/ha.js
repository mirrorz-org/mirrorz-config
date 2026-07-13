const tunasync = require("./tunasync");
const options = require("./options");
const isoinfo = require("./isoinfo");
const loadSite = require("./site");

module.exports = async function (siteSource) {
  const site = await loadSite(siteSource);
  let mirrors = await tunasync(
    "https://mirrors.ha.edu.cn/static/tunasync.json",
  );
  mirrors = await options(
    "https://mirrors.ha.edu.cn/static/options.json",
    mirrors,
  );
  const info = await isoinfo("https://mirrors.ha.edu.cn/static/isoinfo.json");

  return {
    site,
    info,
    mirrors,
  };
};
