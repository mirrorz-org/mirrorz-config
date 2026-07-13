const cname = require("./utils").cname;

// quirks for some site
function quirks(mirrorz) {
  if (mirrorz.site.abbr.includes("SJTUG")) {
    for (let mirror of mirrorz.mirrors) {
      if (mirror.url === "/pypi/web/simple") {
        mirror.url = "/pypi";
      }
      if (mirror.url === "/nix-channels/store") {
        mirror.url = "/nix-channels";
      }
    }
  }
  return mirrorz;
}

module.exports = async function (mirrorz) {
  const name_func = await cname();
  // remove trailing slash in site.url
  mirrorz.site.url = mirrorz.site.url.replace(/\/$/, "");
  for (let mirror of mirrorz.mirrors) {
    // remove trailing slash in mirrors.url
    mirror.url = mirror.url.replace(/\/$/, "");
    // re-apply cname for mirrors.cname
    // (as mirrorz.json directly from mirror sites may not get the latest cname.json)
    mirror.cname = name_func(mirror.cname);
  }
  // sort by mirrors.cname
  mirrorz.mirrors = mirrorz.mirrors.sort((l, r) => l.cname.localeCompare(r.cname))
  // re-apply cname for info.distro
  // (as mirrorz.json directly from mirror sites may not get the latest cname.json)
  if ("info" in mirrorz) {
    for (let info of mirrorz.info) {
      info.distro = name_func(info.distro);
    }
    // sort by info.distro
    mirrorz.info = mirrorz.info.sort((l, r) => l.distro.localeCompare(r.distro))
  }
  return quirks(mirrorz)
};
