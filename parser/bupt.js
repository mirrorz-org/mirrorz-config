const tunasync = require("./tunasync");
const siteData = require("./sites/bupt.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  const mirrors = await tunasync("https://mirrors.bupt.edu.cn/static/tunasync.json");

  return {
    site,
    info: [],
    mirrors,
  }
};
