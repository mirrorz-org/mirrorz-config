import parsers from "./parsers";

export type Parser = () => Promise<unknown>;
export default parsers;
