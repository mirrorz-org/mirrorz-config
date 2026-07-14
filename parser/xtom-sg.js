const ustclugv1 = require("./ustclug-v1");
const siteData = require("../json-site/xtom-sg.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  const data = await ustclugv1(
    "https://r.zenithal.workers.dev/https://mirrors.xtom.sg/",
    "https://mirrors.xtom.sg/api/v1/metas"
  );

  return {
    site,
    info: data.info,
    mirrors: data.mirrors,
  };
};
