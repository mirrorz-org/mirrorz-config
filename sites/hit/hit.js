const tunasync = require("../../parser/tunasync");
const siteData = require("./hit.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  const mirrors = await tunasync("https://mirrors.hit.edu.cn/jobs");

  return {
    site,
    info: [],
    mirrors,
  }
};
