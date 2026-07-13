const tunasync = require("./tunasync");
const isoinfo = require("./isoinfo");

module.exports = async function (siteUrl) {
  const site = await (await fetch(siteUrl)).json();
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
