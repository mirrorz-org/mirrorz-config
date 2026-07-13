const cname = require("./utils").cname;
const ideal_mirror = require("./ideal-mirror");

module.exports = async function (siteUrl) {
  const name_func = await cname();
  const site = await (await fetch(siteUrl)).json();
  const ideal = await ideal_mirror("https://mirror.bjtu.edu.cn/status/task_status.json");
  const desc_help = await (await fetch("https://mirror.bjtu.edu.cn/help/desc_help.json")).json();

  const mirrors = []
  for (const d in desc_help) {
    const p = desc_help[d];
    const c = name_func(d);
    for (const m of ideal) {
      if (m.cname == c) {
        const q = {
          cname: c,
        }
        if ("link" in p)
          q.url = p.link;
        if ("desc" in p)
          q.desc = p.desc;
        if ("help" in p)
          q.help = p.help;
        if ("upstream" in m)
          q.upstream = m.upstream;
        q.status = m.status;
        if ("size" in m)
          q.size = m.size;
        mirrors.push(q);
      }
    }
  }

  return {
    site,
    info: [],
    mirrors,
  }
};
