const tunasync = require("../../parser/tunasync");
const options = require("../../parser/options");
const disk = require("../../parser/disk");
const siteData = require("./nano.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  site["disk"] = await disk("https://mirrors.tuna.tsinghua.edu.cn/static/status/nano/disk.json")

  let mirrors = await tunasync("https://mirrors.tuna.tsinghua.edu.cn/static/tunasync.json.nano");
  mirrors = await options("https://mirrors.tuna.tsinghua.edu.cn/static/js/options.json", mirrors);

  return {
    site,
    info: [],
    mirrors,
  }
};
