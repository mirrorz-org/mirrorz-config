module.exports = async function () {
    const response = await fetch("https://mirrors.ustc.edu.cn/static/json/mirrorz.json");
    return response.json();
}
