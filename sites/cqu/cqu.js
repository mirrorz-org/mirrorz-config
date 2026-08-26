const tunasync = require("../../parser/tunasync");
const isoinfo = require("../../parser/isoinfo");
const siteData = require("./cqu.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  const mirrors = await tunasync("https://mirrors-metadata.cqulug.club/tunasync.json");
  const info = await isoinfo("https://mirrors-metadata.cqulug.club/isoinfo.json");

  for (const m of mirrors) {
    if (m.cname.includes(".git")) {
      // a hack for cqu, they put .git in /git/xxx.git
      m.url = '/git' + m.url
    }
  }

  return {
    site,
    info,
    mirrors,
  }
};
