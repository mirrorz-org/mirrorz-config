import { Mirrorz } from "../schema";

import parsers from "./parsers";

export type Parser = () => Promise<Mirrorz>;
export default parsers;
