import * as fs from "fs";
import * as path from "path";

import { Config } from "../interfaces/interfaces.js";

/*------------ clean output of build ------------*/
export default function cli_clean(config: Config) {
	/*------------ directories ------------*/
	const rootdir = config.rootdir;
	const publicdir = path.join(rootdir, config.publicdir);

	/*------------ delete publicdir ------------*/
	if (fs.existsSync(publicdir)) {
		fs.rmSync(publicdir, { recursive: true });
		console.log(`Cleaned ${publicdir} !`);
	}
}
