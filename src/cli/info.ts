import * as fs from "node:fs";
import * as os from "node:os";

import { CliOptions, Config } from "../interfaces/interfaces";

// gives information about the system and the current configuration
export default function cli_info(config: Config) {
	console.log("General Information:");
	console.log("Operating System:", os.version());
	console.log("Templex Version:", "0.1.0"); // change every version
	console.log("\n");
	console.log("This is your current config:");
	console.log(config);
	console.log("\nI hope this helps you ;)");
}
