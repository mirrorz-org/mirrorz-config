const tunasync = require("../../parser/tunasync");
const options = require("../../parser/options");
const isoinfo = require("../../parser/isoinfo");
const siteData = require("./ha.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  let mirrors = await tunasync(
    "https://mirrors.ha.edu.cn/static/tunasync.json",
  );
  mirrors = await options(
    "https://mirrors.ha.edu.cn/static/options.json",
    mirrors,
  );
  const info = await isoinfo("https://mirrors.ha.edu.cn/static/isoinfo.json");

  return {
    site,
    info,
    mirrors,
  };
};
