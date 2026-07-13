const tunasync = require("./tunasync");
const isoinfo = require("./isoinfo");
const loadSite = require("./site");

module.exports = async function (siteSource) {
  const site = await loadSite(siteSource);

  const mirrors = await tunasync("https://mirrors.njtech.edu.cn/jobs");
  const info = await isoinfo("https://mirrors.njtech.edu.cn/isos");

  return {
    site,
    info,
    mirrors,
  }
};
