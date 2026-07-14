const ustclugv1 = require("./ustclug-v1");
const siteData = require("../json-site/xtom-jp.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
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
