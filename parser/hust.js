const tunasync = require("./tunasync");

module.exports = async function (siteUrl) {
  const site = await (await fetch(siteUrl)).json();
  const mirrors = await tunasync("https://mirrors.hust.edu.cn/status.json");

  return {
    site,
    info: [],
    mirrors,
  }
};
