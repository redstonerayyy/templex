import * as fs from "fs";
import * as path from "path";

import { CliOptions, Config } from "../interfaces/interfaces.js";

/*------------ try to create a new content piece ------------*/
// errors if configuration does not exist
// gives out info if the post exists and does not overwrite it
export default function cli_new(cli_options: CliOptions, config: Config) {
	/*------------ check for sufficient arguments ------------*/
	if (cli_options.arguments.length < 1) {
		console.log("Not enough arguments! Missing required path argument");
		return;
	}

	/*------------ check if file to create already exists ------------*/
	if (fs.existsSync(cli_options.arguments[0])) {
		console.log(`Post ${cli_options.arguments[1]} already exists`);
		return;
	}

	/*------------ check if type of new file was supplied, else use default ------------*/
	let typepath = path.join(config.rootdir, config.scaffolddir, "post.md");
	if (cli_options.arguments.length > 1)
		typepath = path.join(
			config.rootdir,
			config.scaffolddir,
			cli_options.arguments[1] + ".md"
		);

	/*------------ check if type for new file exists ------------*/
	if (!fs.existsSync(typepath)) {
		console.log("Type of new file not present! Bailing out :)");
		return;
	}

	/*------------ create folder ------------*/
	fs.mkdirSync(path.basename(cli_options.arguments[0]), {
		recursive: true,
	});

	/*------------ copy file ------------*/
	fs.cpSync(typepath, cli_options.arguments[0]);
}
