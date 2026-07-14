const tunasync = require("./tunasync");
const siteData = require("../json-site/ynuosa.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  const mirrors = await tunasync("https://mirrors.ynu.edu.cn/jobs");

  return {
    site,
    info: [],
    mirrors,
  }
};
