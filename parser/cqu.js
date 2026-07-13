const tunasync = require("./tunasync");
const isoinfo = require("./isoinfo");
const loadSite = require("./site");

module.exports = async function (siteSource) {
  const site = await loadSite(siteSource);
  const mirrors = await tunasync("https://mirrors.cqu.edu.cn/static/tunasync.json");
  const info = await isoinfo("https://mirrors.cqu.edu.cn/static/isoinfo.json");

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
