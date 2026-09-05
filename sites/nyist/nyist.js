const tunasync = require("../../parser/tunasync");
const options = require("../../parser/options");
const isoinfo = require("../../parser/isoinfo");
const siteData = require("./nyist.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  let mirrors = await tunasync(
    "https://mirror.nyist.edu.cn/static/tunasync.json",
  );
  mirrors = await options(
    "https://mirror.nyist.edu.cn/static/options.json",
    mirrors,
  );
  const info = await isoinfo("https://mirror.nyist.edu.cn/static/isoinfo.json");

  return {
    site,
    info,
    mirrors,
  };
};
