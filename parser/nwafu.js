const tunasync = require("./tunasync");
const loadSite = require("./site");

module.exports = async function (siteSource) {
  const site = await loadSite(siteSource);
  const mirrors = await tunasync("https://mirrors.nwafu.edu.cn/api/mirrorz/jobs");

  return {
    site,
    info: [],
    mirrors,
  }
};
