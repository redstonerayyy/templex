import * as fs from "fs";
import * as path from "path";
import * as yaml from "yaml";

import { Config } from "../interfaces/interfaces.js";
import { walk_dir } from "../filesystem/filesystem.js";
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

/*--------------------- READ CONFIG ---------------------*/
export function read_config_folder(configdir: string, cwd: string) {
	/*------------ gather all config file paths ------------*/
	if (!fs.existsSync(configdir)) {
		console.log(`Can't find config folder ${configdir} !`);
		process.exit();
	}

	/*------------ config ------------*/
	let config: Config;

	/*------------ read config file ------------*/
	const configpathyml: string = path.join(configdir, "config.yml");
	const configpathjson: string = path.join(configdir, "config.json");

	if (fs.existsSync(configpathyml)) {
		config = read_yml_config(configpathyml);
	} else if (fs.existsSync(configpathjson)) {
		config = read_json_config(configpathjson);
	} else {
		console.log(`Can't find config.yml or config.json in config folder!`);
		process.exit();
	}

	/*------------ add directories to config ------------*/
	// root dir isn't necessary the cwd
	config.configdir = configdir;
	config.executiondir = cwd;
	config.rootdir = path.dirname(configdir);

	/*------------ return config ------------*/
	return config;
}
