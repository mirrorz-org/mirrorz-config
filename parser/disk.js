const human = function(size) {
  const scale = ["KiB", "MiB", "GiB", "TiB"];
  let i = 0;
  while (size > 1024) {
    size /= 1024;
    i += 1;
  }
  return size.toFixed(2) + scale[i];
}

module.exports = async function (diskUrl) {
  var disk = await (await fetch(diskUrl)).json();
  if(!Array.isArray(disk))
    disk = [disk];
  return disk.map((d) => human(d.used_kb) + "/" + human(d.total_kb)).join(' + ');
};
