import * as fs from "fs";
import * as path from "path";

import { Config } from "../interfaces/interfaces";
import { walk_dir } from "../filesystem/filesystem";
import { read_html_template } from "./specials";
import { process_template_includes } from "./includes";

export function makes_sites(
	config: Config,
	contentdir: string,
	layoutdir: string
) {
	// initialize site data
	const site = { ...config.site };

	// read include files
	const includepaths = walk_dir(path.join(layoutdir, "includes"));
	const includes: { [key: string]: any } = {};

	for (const includepath of includepaths) {
		includes[path.basename(includepath)] = read_html_template(includepath);
	}

	// for (const key in includes) {
	// 	console.log(key, includes[key].dynamics);
	// }

	// read special files
	const specialpaths = walk_dir(path.join(layoutdir, "specials"));
	const specials: { [key: string]: any } = {};

	for (const specialpath of specialpaths) {
		specials[path.basename(specialpath)] = read_html_template(specialpath);
		// process special files with includes
		specials[path.basename(specialpath)] = process_template_includes(
			path.basename(specialpath),
			specials[path.basename(specialpath)],
			includes
		);
	}

	for (const key in specials) {
		console.log(key, specials[key]);
	}

	// read template files
	const templatepaths = walk_dir(path.join(layoutdir, "templates"));
	const templates: { [key: string]: any } = {};

	for (const templatepath of templatepaths) {
		templates[path.basename(templatepath)] =
			read_html_template(templatepath);
		// process template files with includes
		templates[path.basename(templatepath)] = process_template_includes(
			path.basename(templatepath),
			templates[path.basename(templatepath)],
			includes
		);
	}

	// walk content directory and make sites

	// make layout/sites/*
}
