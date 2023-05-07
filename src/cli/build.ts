import * as fs from "fs";
import * as path from "path";

import { CliOptions, Config } from "../interfaces/interfaces.js";
import { make_static } from "../static/static.js";

/*------------ function to build the site for deployment ------------*/
// optimizes the build for minmal size and load time
export default function cli_build(cli_options: CliOptions, config: Config) {
	const rootdir = config.configdir;

	/*------------ directories ------------*/
	const staticdir = path.join(rootdir, config.staticdir);
	const publicdir = path.join(rootdir, config.publicdir);

	/*------------ copy static dir ------------*/
	make_static(staticdir, publicdir);
}
