const tunasync = require("./tunasync");
const options = require("./options");
const isoinfo = require("./isoinfo");
const disk = require("./disk");
const siteData = require("./sites/bfsu.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  site["disk"] = await disk("https://mirrors.bfsu.edu.cn/static/status/disk.json");

  let mirrors = await tunasync("https://mirrors.bfsu.edu.cn/static/tunasync.json");
  mirrors = await options("https://mirrors.bfsu.edu.cn/static/js/options.json", mirrors);
  const info = await isoinfo("https://mirrors.bfsu.edu.cn/static/status/isoinfo.json");

  return {
    site,
    info,
    mirrors,
  }
};
