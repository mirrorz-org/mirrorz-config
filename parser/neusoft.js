const cname = require("./utils").cname;

const statusConverter = function(time, status) {
  let c = "S";
  const t = Math.round(new Date(time).getTime()/1000).toString();
  return c + t;
};

const human = function(size) {
  const scale = ["B", "KiB", "MiB", "GiB", "TiB"];
  let i = 0;
  while (size > 1024) {
    size /= 1024;
    i += 1;
  }
  return size.toFixed(2) + scale[i];
}

module.exports = async function (siteUrl) {
  const name_func = await cname();
  const site = await (await fetch(siteUrl)).json();
  const repos = await (await fetch("https://mirrors.neusoft.edu.cn/index.json")).json();

  const mirrors = [{
    cname: "gentoo-portage",
    url: "/gentoo-portage",
    status: "U"
  }];
  for (const k in repos) {
    const cname = name_func(k)
    const url = "/" + k;
    const size = human(repos[k].size);
    mirrors.push({
      cname,
      url,
      size,
      status: statusConverter(repos[k].date)
    })
  }

  return {
    site,
    info: [],
    mirrors,
  }
};
