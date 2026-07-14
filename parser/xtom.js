const ustclugv1 = require("./ustclug-v1");
const siteData = require("../json-site/xtom.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  const data = await ustclugv1(
    "https://r.zenithal.workers.dev/https://mirrors.xtom.com/",
    "https://mirrors.xtom.com/api/v1/metas"
  );

  return {
    site,
    info: data.info,
    mirrors: data.mirrors,
  };
};
