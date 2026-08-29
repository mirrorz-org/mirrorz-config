const tunasync = require("../../parser/tunasync");
const isoinfo = require("../../parser/isoinfo");
const disk = require("../../parser/disk");
const siteData = require("./xtom-au.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  site["disk"] = await disk("https://mirrors.xtom.au/static/status/disk.json");

  const mirrors = await tunasync("https://mirrors.xtom.au/static/tunasync.json");
  const info = await isoinfo("https://mirrors.xtom.au/static/status/isoinfo.json");

  return {
    site,
    info,
    mirrors,
  }
};
