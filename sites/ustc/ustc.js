const override = require("../../parser/override");
const overrideData = require("./override.json");

module.exports = async function () {
    const response = await fetch("https://mirrors.ustc.edu.cn/static/json/mirrorz.json");
    return override(await response.json(), overrideData);
}
