const tunasync = require("./tunasync");
const options = require("./options");
const disk = require("./disk");
const siteData = require("../json-site/nano.json");

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
