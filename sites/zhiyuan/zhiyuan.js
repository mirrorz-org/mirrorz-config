module.exports = async function () {
    const response = await fetch("https://mirror.sjtu.edu.cn/mirrorz/zhiyuan.json");
    return response.json();
}
