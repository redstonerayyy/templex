import * as fs from "node:fs";
import * as path from "node:path";

import { CLI_OPTIONS } from "../interfaces/interfaces";

// try to create a new content piece
// using the supplied configuration and folderpath
// errors if configuration does not exist
// gives out info if the post exists and does not overwrite it
export function cli_new(cli_options: CLI_OPTIONS, scaffoldsdir: string) {
	// check for sufficient arguments
	if (cli_options.arguments.length >= 1) {
		const newpath = path.join(
			scaffoldsdir,
			cli_options.arguments[1] + ".md"
		);

		// create new post if configuration exists
		// and post does not already exist
		if (fs.existsSync(newpath)) {
			if (!fs.existsSync(cli_options.arguments[1])) {
				try {
					// create folder, copy configuration
					fs.mkdirSync(cli_options.arguments[1], { recursive: true });
					fs.cpSync(
						newpath,
						path.join(
							cli_options.arguments[1],
							cli_options.arguments[0] + ".json"
						)
					);
					// index.md file
					fs.writeFileSync(
						path.join(cli_options.arguments[1], "index.md"),
						"",
						{ encoding: "utf-8" }
					);
				} catch (e) {
					console.log(
						`Error creating post. Path is ${cli_options.arguments[1]}`
					);
				}
			} else {
				console.log(`Post ${cli_options.arguments[1]} already exists`);
			}
		} else {
			console.log(`Error creating post. Can't find ${newpath}`);
		}
	} else {
		console.log(`Not enough argument for command ${cli_options.command}`);
	}
}
