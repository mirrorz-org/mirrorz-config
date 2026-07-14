const tunasync = require("./tunasync");
const siteData = require("./sites/hust.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  const mirrors = await tunasync("https://mirrors.hust.edu.cn/status.json");

  return {
    site,
    info: [],
    mirrors,
  }
};
