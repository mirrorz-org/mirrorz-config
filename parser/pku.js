const cname = require("./utils").cname;

const MAP = {
  done: "S",
  sync: "Y",
  error: "F",
};

const statusConverter = function(item) {
  const c = MAP[item.state] ?? "U";
  const last = Math.round(new Date(item.lastSyncTime).getTime()/1000).toString();
  const next = Math.round(new Date(item.nextSyncTime).getTime()/1000).toString();
  if (c == "S")
    return c + last + "X" + next;
  else
    return c + "O" + last + "X" + next;
};

const human = function(size) {
  const scale = ["MiB", "GiB", "TiB", "PiB"];
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
  const disk = await (await fetch("https://mirrors.pku.edu.cn/monitor_device_status/disk_space.json")).json();
  site.disk = human(disk.result.data.slice(-1)[0][1]) + "/" + human(disk.result.data.slice(-1)[0][1] + disk.result.data.slice(-1)[0][2]);

  const stat = await (await fetch("https://mirrors.pku.edu.cn/monitor/status")).json();

  const mirrors = stat.map((item) => {
    const mirror = {
      cname: name_func(item.id),
      url: "/" + item.id,
      status: statusConverter(item),
    }
    if ("diskUsage" in item && item.diskUsage !== "")
      mirror["size"] = item.diskUsage;
    return mirror;
  }).filter((e) => e !== null);

  return {
    site,
    info: [],
    mirrors,
  }
};
