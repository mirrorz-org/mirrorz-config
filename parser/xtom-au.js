const tunasync = require("./tunasync");
const isoinfo = require("./isoinfo");
const disk = require("./disk");
const loadSite = require("./site");

module.exports = async function (siteSource) {
  const site = await loadSite(siteSource);
  site["disk"] = await disk("https://mirrors.xtom.au/static/status/disk.json");

  const mirrors = await tunasync("https://mirrors.xtom.au/static/tunasync.json");
  const info = await isoinfo("https://mirrors.xtom.au/static/status/isoinfo.json");

  return {
    site,
    info,
    mirrors,
  }
};
