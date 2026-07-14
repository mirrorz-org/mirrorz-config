const tunasync = require("./tunasync");
const siteData = require("../json-site/jcut.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  const mirrors = await tunasync("https://mirrors.jcut.edu.cn/jobs");

  return {
      site,
      info: [],
      mirrors,
  }
};
