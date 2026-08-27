const tunasync = require("./tunasync");
const siteData = require("./sites/sysu.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  const allMirrors = await tunasync("https://mirror.sysu.edu.cn/status");
  // disable repositories that never sync successfully
  const mirrors = allMirrors.filter(m => !m.status.startsWith('F') || m.status.includes('O'));
  return {
    site,
    mirrors,
  }
};
