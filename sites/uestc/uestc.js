module.exports = async function () {
    const response = await fetch("https://uestclug.org/mirrors-status/mirrorz.d.json");
    return response.json();
}
