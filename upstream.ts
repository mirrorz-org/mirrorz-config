import parsers, { Parser } from "./parser";
import config from "../mirrorz-config/config.json";

const upstreams: (Parser | string)[] = config.mirrors.map((e) => parsers[e]);

export default upstreams;
