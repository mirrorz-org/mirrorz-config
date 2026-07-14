const tunasync = require("./tunasync");
const siteData = require("../json-site/nwafu.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  const mirrors = await tunasync("https://mirrors.nwafu.edu.cn/api/mirrorz/jobs");

  return {
    site,
    info: [],
    mirrors,
  }
};
