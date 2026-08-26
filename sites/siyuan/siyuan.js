module.exports = async function () {
    const response = await fetch("https://mirror.sjtu.edu.cn/mirrorz/siyuan.json");
    return response.json();
}
