const tunasync = require("../../parser/tunasync");
const isoinfo = require("../../parser/isoinfo");
const siteData = require("./xjtu.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  let mirrors = await tunasync("https://mirrors.xjtu.edu.cn/.well-known/mirrorz-org-mirrors.json");
  mirrors = mirrors.map((item) => ({ ...item, url: item.url + "/" }));
  const info = await isoinfo("https://mirrors.xjtu.edu.cn/.well-known/mirrorz-org-isoinfo.json");

  return {
    site,
    info,
    mirrors,
  }
};
