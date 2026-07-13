const config = require('./config.json');
var cname;

exports.cname = async function() {
  if (!cname) {
    const data = await fetch(config.url + "/static/json/cname.json");
    cname = await data.json();
  }
  return (name) => { return (name in cname) ? cname[name] : name; };
};
