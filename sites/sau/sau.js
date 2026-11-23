const tunasync = require("../../parser/tunasync");
const isoinfo = require("../../parser/isoinfo");
const siteData = require("./sau.json");

module.exports = async function () {
    const site = JSON.parse(JSON.stringify(siteData));
    const mirrors = await tunasync("https://mirrors.sau.edu.cn/static/tunasync.json");
    const info = await isoinfo("https://mirrors.sau.edu.cn/static/status/isoinfo.json");

    return {
        site,
        info,
        mirrors,
    }
};
