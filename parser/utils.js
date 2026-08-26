const cname = require('../../config/config/cname.json');

exports.cname = async function() {
  return (name) => { return (name in cname) ? cname[name] : name; };
};
