const tunasync = require("./tunasync");
const isoinfo = require("./isoinfo");

module.exports = async function (siteUrl) {
  const site = await (await fetch(siteUrl)).json();
  let mirrors = await tunasync("https://mirrors.xjtu.edu.cn/.well-known/mirrorz-org-mirrors.json");
  mirrors = mirrors.map((item) => ({ ...item, url: item.url + "/" }));
  const info = await isoinfo("https://mirrors.xjtu.edu.cn/.well-known/mirrorz-org-isoinfo.json");

  return {
    site,
    info,
    mirrors,
  }
};
