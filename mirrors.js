const config = require('./config.json')
module.exports =
  config.mirrors_legacy.map((e) => config.url + '/static/json/legacy/' + e + '.json')
    .concat(Object.values(config.mirrors))
