module.exports = async function () {
    const response = await fetch("https://mirrors.sdu.edu.cn/mirrorz.json");
    return response.json();
}
