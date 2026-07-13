const tunasync = require("./tunasync");
const isoinfo = require("./isoinfo");

module.exports = async function (siteUrl) {
  const site = await (await fetch(siteUrl)).json();

  const mirrors = await tunasync("https://mirrors.njtech.edu.cn/jobs");
  const info = await isoinfo("https://mirrors.njtech.edu.cn/isos");

  return {
    site,
    info,
    mirrors,
  }
};
