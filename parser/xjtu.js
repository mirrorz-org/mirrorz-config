const tunasync = require("./tunasync");
const isoinfo = require("./isoinfo");
const loadSite = require("./site");

module.exports = async function (siteSource) {
  const site = await loadSite(siteSource);
  let mirrors = await tunasync("https://mirrors.xjtu.edu.cn/.well-known/mirrorz-org-mirrors.json");
  mirrors = mirrors.map((item) => ({ ...item, url: item.url + "/" }));
  const info = await isoinfo("https://mirrors.xjtu.edu.cn/.well-known/mirrorz-org-isoinfo.json");

  return {
    site,
    info,
    mirrors,
  }
};
