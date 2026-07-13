const tunasync = require("./tunasync");
const loadSite = require("./site");

module.exports = async function (siteSource) {
  const site = await loadSite(siteSource);
  const mirrors = await tunasync("https://mirrors.hit.edu.cn/jobs");

  return {
    site,
    info: [],
    mirrors,
  }
};
