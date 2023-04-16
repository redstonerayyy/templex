import * as fs from "node:fs";
import * as path from "node:path";

import { Dictionary, Config } from "../_interfaces/_interfaces";
import { walk_dir } from "../file/filesystem";
import { read_html_template } from "./sites/specials";

export function makes_sites(
	config: Config,
	contentdir: string,
	layoutdir: string
) {
	// initialize site data
	const site = { ...config.site };

	// read include files
	const includepaths = walk_dir(path.join(layoutdir, "includes"));
	const includes: Dictionary = {};

	for (const includepath of includepaths) {
		includes[path.basename(includepath)] = read_html_template(includepath);
	}

	// for (const key in includes) {
	// 	console.log(key, includes[key].dynamics);
	// }

	// read special files
	const specialpaths = walk_dir(path.join(layoutdir, "specials"));
	const specials: Dictionary = {};

	for (const specialpath of specialpaths) {
		specials[path.basename(specialpath)] = read_html_template(specialpath);
	}

	// for (const key in specials) {
	// 	console.log(key, specials[key].dynamics);
	// }

	// walk content directory and make sites

	// make layout/sites/*
}
