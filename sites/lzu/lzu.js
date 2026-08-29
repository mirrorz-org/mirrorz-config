module.exports = async function () {
    const response = await fetch("https://mirror.lzu.edu.cn/.mirrorz.json");
    return response.json();
}
