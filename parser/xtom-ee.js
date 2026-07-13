const ustclugv1 = require("./ustclug-v1");
const loadSite = require("./site");

module.exports = async function (siteSource) {
  const site = await loadSite(siteSource);
  const data = await ustclugv1(
    "https://r.zenithal.workers.dev/https://mirrors.xtom.ee/",
    "https://mirrors.xtom.ee/api/v1/metas"
  );

  return {
    site,
    info: data.info,
    mirrors: data.mirrors,
  };
};
