import parsers, { Parser } from "../parser";
import config from "./config.json";

const upstreams: (string | Parser)[] =
  config.upstream_legacy.map((e) => config.url + '/static/json/legacy/' + e + '.json')
    .concat(config.upstream_mirrors)
    .concat(config.upstream_parser.map((e) => parsers[e]));

export default upstreams;
