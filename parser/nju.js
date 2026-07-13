const tunasync = require("./tunasync");
const isoinfo = require("./isoinfo");
const cname = require("./utils").cname;

async function addition(additionUrl, mirrors) {
  const name_func = await cname();
  const data = await (await fetch(additionUrl)).json();

  data.forEach((u) => {
    let exist = false;
    let status = "U";
    if ("inherit" in u && u.inherit !== null) {
      mirrors.forEach((m) => {
        if (m.options_name == u.inherit) {
          exist = true;
          status = m.status;
        }
      });
    } else {
      let in_tunasync = false;
      mirrors.forEach((m) => {
        if (m.options_name == u.name) {
          in_tunasync = true;
          m.url = "route" in u ? u.route : ("path" in u ? u.path : "/" + u.name);
        }
      });
      if (!in_tunasync) {
        exist = true;
        if ("status" in u) {
          if (u.status === "cache")
            status = "C";
        }
      }
    }

    if (exist) {
      const mirror = {
        cname: name_func(u.name),
        options_name: u.name, // used by help()
        url: "route" in u ? u.route : ("path" in u ? u.path : "/" + u.name),
        status,
      }
      mirrors.push(mirror);
    }
  });

  return mirrors;
}

async function help(helpUrl, mirrors) {
  const data = await (await fetch(helpUrl)).json();

  data.forEach((u) => {
    mirrors.forEach((m) => {
      if (m.options_name == u.name) {
        if ("route" in u) {
          m.help = u.route;
        } else if ("redirect" in u) {
          m.help = u.redirect;
        }
      }
    });
  });

  return mirrors;
}


module.exports = async function () {
  const site = await (await fetch("https://mirrors.nju.edu.cn/.mirrorz/site.json")).json();
  const info = await isoinfo("https://mirror.nju.edu.cn/.mirrorz/iso.json");

  let mirrors = await tunasync("https://mirrors.nju.edu.cn/.mirrorz/tunasync.json");
  mirrors = await addition("https://mirror.nju.edu.cn/.mirrorz/addition.json", mirrors);
  mirrors = await help("https://mirror.nju.edu.cn/.mirrorz/help.json", mirrors);

  return {
    site,
    info,
    mirrors,
  }
};
