import * as fs from "fs";
import * as path from "path";

import { CliOptions, Config } from "../interfaces/interfaces.js";
import { make_static } from "../static/static.js";
import { make_processed } from "../processed/processed.js";

/*------------ function to build the site for deployment ------------*/
// optimizes the build for minmal size and load time
export default function cli_build(cli_options: CliOptions, config: Config) {
	const rootdir = config.rootdir;

	/*------------ directories ------------*/
	const staticdir = path.join(rootdir, config.staticdir);
	const processeddir = path.join(rootdir, config.processeddir);

	const publicdir = path.join(rootdir, config.publicdir);

	/*------------ copy static dir ------------*/
	make_static(staticdir, publicdir);

	/*------------ process assets ------------*/
	make_processed(processeddir, publicdir);
}
