const cname = require("./utils").cname;

module.exports = async function (optionsUrl, mirrors) {
  const name_func = await cname();
  const options = await (await fetch(optionsUrl)).json();

  options.options.unlisted_mirrors.forEach((u) => {
    let exist = false;
    let status = "U";
    if ("link_to" in u) {
      mirrors.forEach((m) => {
        if (m.options_name == u.link_to) {
          exist = true;
          status = m.status;
        }
      });
    } else
      exist = true;

    if (exist) {
      const mirror = {
        cname: name_func(u.name),
        url: "url" in u ? u.url : "/" + u.name,
        status,
      }
      if ("upstream" in u)
        mirror["upstream"] = u.upstream;
      mirrors.push(mirror);
    }
  });

  for (const d of options.options.mirror_desc)
    for (const m of mirrors)
      if (m.options_name == d.name)
        m.desc = d.desc;

  for (const h of options.helps)
    for (const m of mirrors)
      if (m.options_name == h.mirrorid)
        m.help = h.url;

  // force_redirect_help makes mirrorz-302 and mirrorz-help unhappy
  //for (const f of options.options.force_redirect_help_mirrors)
  //  for (const m of mirrors)
  //    // a hack for tuna/bfsu, they put .git in /git/xxx.git
  //    if (m.options_name == f && !m.options_name.includes(".git"))
  //      m.url = m.help;

  for (const n of options.options.new_mirrors)
    for (const m of mirrors)
      if (m.options_name == n)
        m.status += "N";

  // a hack for tuna/bfsu, they put .git in /git/xxx.git
  // also AOSP/lineageOS/CocoaPods/git-repo/homebrew
  for (const m of mirrors) {
    if (m.options_name && m.options_name.includes(".git")) // in case of null options_name
      m.url = '/git' + m.url
    if (m.options_name && (
        m.options_name === "AOSP" ||
        m.options_name === "lineageOS" ||
        m.options_name === "CocoaPods" ||
        m.options_name === "git-repo" ||
        m.options_name === "homebrew"
        ))
      m.url = '/git' + m.url
  }

  return mirrors;
};
