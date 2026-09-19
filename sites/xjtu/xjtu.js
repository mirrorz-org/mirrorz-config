const tunasync = require("../../parser/tunasync");
const isoinfo = require("../../parser/isoinfo");
const siteData = require("./xjtu.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  let mirrors = await tunasync("https://mirrors.xjtu.edu.cn/api/mirrors.json");
  mirrors = mirrors.map((item) => ({ ...item, url: item.url + "/" }));
  const info = await isoinfo("https://mirrors.xjtu.edu.cn/api/downloads.json");

  return {
    site,
    info,
    mirrors,
  }
};
