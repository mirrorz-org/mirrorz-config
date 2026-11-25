module.exports = async function () {
    const response = await fetch("https://mirrors.sau.edu.cn/mirrorz.json");
    return response.json();
}
