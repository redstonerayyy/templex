import { CliOptions, Config } from "../interfaces/interfaces";

// gives information about the system and the current configuration
export default function cli_info(config: Config) {
	console.log("Templex Version:", "0.1.0"); // change every version
	console.log("This is your current config:");
	console.log(config);
	console.log("\nI hope this helps you ;)");
}
