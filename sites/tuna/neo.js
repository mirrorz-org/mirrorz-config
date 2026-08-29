const tunasync = require("../../parser/tunasync");
const options = require("../../parser/options");
const disk = require("../../parser/disk");
const siteData = require("./neo.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  site["disk"] = await disk("https://mirrors.tuna.tsinghua.edu.cn/static/status/neo/disk.json")

  let mirrors = await tunasync("https://mirrors.tuna.tsinghua.edu.cn/static/tunasync.json.neo");
  mirrors = await options("https://mirrors.tuna.tsinghua.edu.cn/static/js/options.json", mirrors);

  return {
    site,
    info: [],
    mirrors,
  }
};
