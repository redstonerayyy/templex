import * as fs from "fs";
import * as path from "path";

import { CliOptions, Config } from "../interfaces/interfaces.js";
import { copy_static } from "../static/static.js";
import { process_all } from "../processed/processed.js";
import { build_pages } from "../markdown/markdown.js";
import inject_dev_scripts from "../util/devscripts.js";

/*------------ function to build the site for deployment ------------*/
// optimizes the build for minmal size and load time
export default function cli_build(cli_options: CliOptions, config: Config) {
	/*------------ directories ------------*/
	const rootdir = config.directories.root;

	const staticdir = path.join(rootdir, config.directories.static);
	const processeddir = path.join(rootdir, config.directories.processed);
	const publicdir = path.join(rootdir, config.directories.public);

	/*------------ copy static dir ------------*/
	copy_static(staticdir, publicdir);

	/*------------ process assets ------------*/
	process_all(processeddir, publicdir);

	/*------------ make markdown ------------*/
	build_pages(config, publicdir);

	/*------------ inject dev scripts ------------*/
	inject_dev_scripts(config, publicdir);
}
