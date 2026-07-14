const tunasync = require("./tunasync");
const siteData = require("../json-site/hit.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  const mirrors = await tunasync("https://mirrors.hit.edu.cn/jobs");

  return {
    site,
    info: [],
    mirrors,
  }
};
