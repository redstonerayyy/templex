import * as fs from "fs";
import * as path from "path";

import { CliOptions, Config } from "../interfaces/interfaces.js";
import chokidar from "chokidar";
import cli_build from "./build.js";

// build the whole site and watch for file
// changes to rebuild the site efficiently
// and reflect the changes
export default function cli_watch(cli_options: CliOptions, config: Config) {
	/*------------ directories ------------*/
	const rootdir = config.rootdir;

	const staticdir = path.join(rootdir, config.staticdir);
	const processeddir = path.join(rootdir, config.processeddir);
	const layoutdir = path.join(rootdir, config.layoutdir);
	const contentdir = path.join(rootdir, config.contentdir);

	/*------------ define watcher ------------*/
	const watcher = chokidar
		.watch([staticdir, processeddir, layoutdir, contentdir], {
			persistent: true,
		})
		.on("change", (event: string, path: any) => {
			console.log(`${event} was changed. Rebuilding ...`);
			cli_build(cli_options, config);
			console.log("Done");
		});
}
