const ustclugv1 = require("./ustclug-v1");

module.exports = async function (siteUrl) {
  const site = await (
    await fetch(siteUrl)
  ).json();
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
