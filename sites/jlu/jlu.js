module.exports = async function () {
    const response = await fetch("https://mirrors.jlu.edu.cn/_api/mirrorz.json");
    return response.json();
}
