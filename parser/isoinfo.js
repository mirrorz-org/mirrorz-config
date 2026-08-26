const cname = require("./utils").cname;

module.exports = async function (isoinfoUrl) {
  const name_func = await cname();
  const isoinfo = await fetch(isoinfoUrl)
    .then((res) => res.text())
    .then((text) => {
      if (text.trim() === "") {
        return [];
      } else {
        return JSON.parse(text);
      }
    });

  return isoinfo.map((item) => {
    return {
      distro: name_func(item.distro),
      category: item.category,
      urls: item.urls,
    };
  });
};
