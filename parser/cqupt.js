const tunasync = require("./tunasync");
const siteData = require("./sites/cqupt.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  const mirrors = await tunasync("https://mirrors.cqupt.edu.cn/static/tunasync.json");

  return {
    site,
    info: [],
    mirrors,
  }
};
