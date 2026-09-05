const tunasync = require("../../parser/tunasync");
const options = require("../../parser/options");
const isoinfo = require("../../parser/isoinfo");
const siteData = require("./tuna.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  let mirrors = await tunasync("https://mirrors.tuna.tsinghua.edu.cn/static/tunasync.json");
  mirrors = await options("https://mirrors.tuna.tsinghua.edu.cn/static/js/options.json", mirrors);
  const info = await isoinfo("https://mirrors.tuna.tsinghua.edu.cn/static/status/isoinfo.json");

  return {
    site,
    info,
    mirrors,
  }
};
