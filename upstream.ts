import parsers, { Parser } from "./parser";
import config from "./config.json";

const upstreams = config.mirrors.map((e) => {
    if (e in parsers) {
        return parsers[e as keyof typeof parsers];
    }
    return e;
});

export default upstreams;
