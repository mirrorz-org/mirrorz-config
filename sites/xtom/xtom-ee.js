const ustclugv1 = require("../../parser/ustclug-v1");
const siteData = require("./xtom-ee.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
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
