module.exports = async function () {
    const response = await fetch("https://mirror.iscas.ac.cn/.mirrorz/mirrorz.json");
    return response.json();
}
