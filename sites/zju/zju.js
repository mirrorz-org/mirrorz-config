module.exports = async function () {
    const response = await fetch("https://mirrors.zju.edu.cn/mirrorz.json");
    return response.json();
}
