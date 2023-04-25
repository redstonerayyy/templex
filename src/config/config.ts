import * as fs from "node:fs";
import * as path from "node:path";
import * as yaml from "yaml";

import { Config, Dictionary } from "../_interfaces/_interfaces";
import { walk_dir } from "../file/filesystem";

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
	console.log(configdir);

	const configpaths: IterableIterator<string> = walk_dir(configdir);

	console.log(configpaths);

	const configs: Dictionary = {};

	for (const configpath of configpaths) {
		if (path.extname(configpath) == ".json") {
			configs[configpath] = read_json_config(configpath);
		} else if (path.extname(configpath) == ".yml") {
			configs[configpath] = read_yml_config(configpath);
		}
	}

	return configs;
}
