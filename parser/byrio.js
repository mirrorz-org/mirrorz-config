const tunasync = require("./tunasync");
const siteData = require("./sites/byrio.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  const mirrors = await tunasync("https://mirrors.byrio.org/static/tunasync.json");

  return {
    site,
    info: [],
    mirrors,
  }
};
