const cname = require("./utils").cname;
const siteData = require("./sites/geekpie.json");

const statusConverter = function(s) {
  let c = "S";
  if (!s.Idle) {
    c = "YO"
  } else if (!s.Result) {
    c = "FO"
  }
  const t = Math.round(new Date(s.LastFinished).getTime()/1000).toString();
  return c + t;
};

const TYPE_DICT = {
  'system': 'os',
  'software': 'app',
  'font': 'font',
}

module.exports = async function () {
  const name_func = await cname();
  const site = JSON.parse(JSON.stringify(siteData));
  const summary = await (await fetch("https://mirrors.shanghaitech.edu.cn/summary")).json();
  const downloads = await (await fetch("https://mirrors.shanghaitech.edu.cn/downloads")).json();

  const mirrors = []
  for (const k in summary.WorkerStatus) {
    const cname = name_func(k)
    const url = "/" + k;
    const status = statusConverter(summary.WorkerStatus[k])
    mirrors.push({
      cname,
      url,
      status,
    })
  }

  const info = Object.values(downloads).map((item) => {
    return {
      distro: name_func(item.display),
      category: TYPE_DICT[item.type] ?? 'os',
      urls: item.links.map((link) => {
        return {
          name: link.name + " (" + link.external + ")",
          url: link.link,
        }
      }),
    };
  });
  return {
    site,
    info,
    mirrors,
  }
};
