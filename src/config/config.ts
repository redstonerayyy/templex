import * as fs from "node:fs";
import * as path from "node:path";

import { Config } from "../_interfaces/_interfaces";

// read the main json config file
export function read_config(configdir: string): Config {
	const configfile = fs.readFileSync(path.join(configdir, "config.json"), {
		encoding: "utf-8",
	});

	const config: Config = JSON.parse(configfile);
	return config;
}
