module.exports = async function () {
    const response = await fetch("https://mirrors.zju.edu.cn/api/mirrorz.json");
    return response.json();
}
