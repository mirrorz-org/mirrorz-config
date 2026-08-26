const tunasync = require("../../parser/tunasync");
const siteData = require("./sysu.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  const mirrors = await tunasync("https://mirror.sysu.edu.cn/status");
  return {
    site,
    mirrors,
  }
};
