const tunasync = require("../../parser/tunasync");
const options = require("../../parser/options");
const isoinfo = require("../../parser/isoinfo");
const disk = require("../../parser/disk");
const siteData = require("./qlut.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
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
