import * as fs from "fs";
import * as path from "path";
import * as yaml from "yaml";

import { Config } from "../interfaces/interfaces.js";
import deepmerge from "./deepmerge.js";

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
	config = {
		title: "Templex",
		directories: {
			cwd: null,
			config: null,
			root: null,
			public: "./public",
			static: "./static",
			processed: "./processed",
			content: "./content",
			layout: "./layout",
			themes: "./themes",
			scaffold: "./scaffold",
		},
		data: null,
	};

	/*------------ read config file ------------*/
	const configpathyml: string = path.join(configdir, "config.yml");
	const configpathjson: string = path.join(configdir, "config.json");

	let configdata;
	if (fs.existsSync(configpathyml)) {
		configdata = read_yml_config(configpathyml);
	} else if (fs.existsSync(configpathjson)) {
		configdata = read_json_config(configpathjson);
	} else {
		console.log(`Can't find config.yml or config.json in config folder!`);
		process.exit();
	}

	/*------------ merge configdata and config ------------*/
	let merged: Config = deepmerge(config, configdata);

	/*------------ add directories to config ------------*/
	// root dir isn't necessary the cwd
	merged.directories.cwd = cwd;
	merged.directories.config = configdir;
	merged.directories.root = path.dirname(configdir);

	/*------------ return config ------------*/
	return merged;
}
