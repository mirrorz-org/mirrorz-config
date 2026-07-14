const ustclugv1 = require("./ustclug-v1");
const siteData = require("../json-site/xtom-nl.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  const data = await ustclugv1(
    "https://r.zenithal.workers.dev/https://mirrors.xtom.nl/",
    "https://mirrors.xtom.nl/api/v1/metas"
  );

  return {
    site,
    info: data.info,
    mirrors: data.mirrors,
  };
};
