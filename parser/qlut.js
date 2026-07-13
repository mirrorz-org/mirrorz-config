const tunasync = require("./tunasync");
const options = require("./options");
const isoinfo = require("./isoinfo");
const disk = require("./disk");

module.exports = async function (siteUrl) {
  const site = await (await fetch(siteUrl)).json();
  site["disk"] = await disk("https://mirrors.qlu.edu.cn/static/status/disk.json");

  let mirrors = await tunasync("https://mirrors.qlu.edu.cn/static/tunasync.json");
  mirrors = await options("https://mirrors.qlu.edu.cn/static/js/options.json", mirrors);
  const info = await isoinfo("https://mirrors.qlu.edu.cn/static/status/isoinfo.json");

  return {
    site,
    info,
    mirrors,
  }
};