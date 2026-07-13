module.exports = async function loadSite(siteSource) {
  if (typeof siteSource === "string") {
    return await (await fetch(siteSource)).json();
  }

  return siteSource;
};
