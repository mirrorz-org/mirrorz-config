const tunasync = require("../../parser/tunasync");
const isoinfo = require("../../parser/isoinfo");
const siteData = require("./njtech.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));

  const mirrors = await tunasync("https://mirrors.njtech.edu.cn/jobs");
  const info = await isoinfo("https://mirrors.njtech.edu.cn/isos");

  return {
    site,
    info,
    mirrors,
  }
};
