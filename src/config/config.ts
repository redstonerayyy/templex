import * as fs from "fs";
import * as path from "path";
import * as yaml from "yaml";

import { Config, Dictionary } from "../interfaces/interfaces";
import { walk_dir } from "../filesystem/filesystem";
import { config } from "process";

/*--------------------- READ DIFFERENT CONFIG TYPES ---------------------*/
// read json config file
export function read_json_config(filepath: string): Config {
	const configfile = fs.readFileSync(filepath, {
		encoding: "utf-8",
	});

	const config: Config = JSON.parse(configfile);

	return config;
}

// read yaml config file
export function read_yml_config(filepath: string): Config {
	const configfile = fs.readFileSync(filepath, {
		encoding: "utf-8",
	});

	const config: Config = yaml.parse(configfile);

	return config;
}

/*--------------------- GATHER ALL CONFIG FILES ---------------------*/
export function read_config_folder(configdir: string) {
	// gather all config file paths
	if (!fs.existsSync(configdir)) {
		console.log(`Can't find config folder ${configdir} !`);
		process.exit();
	}

	const configpaths = walk_dir(configdir);

	// read all config files
	const configs: Dictionary = {};

	for (const configpath of configpaths) {
		if (path.extname(configpath) == ".json") {
			configs[configpath] = read_json_config(configpath);
		} else if (path.extname(configpath) == ".yml") {
			configs[configpath] = read_yml_config(configpath);
		}
	}

	// merge config files into main config
	const mergedconfig: Config = {
		title: "",
		publicdir: "",
		staticdir: "",
		processeddir: "",
		contentdir: "",
		layoutdir: "",
		scaffolddir: "",
		site: {
			menu: [
				{
					name: "",
					url: "",
				},
			],
		},
	};

	return mergedconfig;
}
