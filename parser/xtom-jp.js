const ustclugv1 = require("./ustclug-v1");
const loadSite = require("./site");

module.exports = async function (siteSource) {
  const site = await loadSite(siteSource);
  const data = await ustclugv1(
    "https://r.zenithal.workers.dev/https://mirrors.xtom.jp/",
    "https://mirrors.xtom.jp/api/v1/metas"
  );

  return {
    site,
    info: data.info,
    mirrors: data.mirrors,
  };
};
