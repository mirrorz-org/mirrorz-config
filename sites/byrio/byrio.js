const tunasync = require("../../parser/tunasync");
const siteData = require("./byrio.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  const mirrors = await tunasync("https://mirrors.byrio.org/static/tunasync.json");

  return {
    site,
    info: [],
    mirrors,
  }
};
