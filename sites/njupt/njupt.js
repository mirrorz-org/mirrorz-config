const tunasync = require("../../parser/tunasync");
const isoinfo = require("../../parser/isoinfo");
const siteData = require("./njupt.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  const info = await isoinfo("https://mirrors.njupt.edu.cn/isoinfo.json");
  let mirrors = await tunasync("https://mirrors.njupt.edu.cn/mirrordsync.json");

  for (const m of mirrors) {
    m["help"] = "/help" + m.url;
  }

  return {
    site,
    info,
    mirrors,
  }
};
