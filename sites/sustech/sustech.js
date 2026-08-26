module.exports = async function () {
    const response = await fetch("https://mirrors.sustech.edu.cn/mirrorz/mirrorz.json");
    return response.json();
}
