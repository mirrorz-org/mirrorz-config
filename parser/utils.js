const config = require('../config.json');
const cname = require('../cname.json');

exports.cname = async function() {
  return (name) => { return (name in cname) ? cname[name] : name; };
};
