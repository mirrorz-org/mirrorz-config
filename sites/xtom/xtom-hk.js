const xtom = require("../../parser/xtom");
const siteData = require("./xtom-hk.json");

module.exports = async function () {
  const site = JSON.parse(JSON.stringify(siteData));
  const data = await xtom(
    `https://r.zenithal.workers.dev/${site.url}/`,
    `${site.url}/api/v1/metas`
  );

  return {
    site,
    info: data.info,
    mirrors: data.mirrors,
  };
};
