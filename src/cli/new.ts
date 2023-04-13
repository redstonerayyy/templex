import * as fs from "node:fs";
import * as path from "node:path";

import { CLI_OPTIONS } from "./interfaces";

export function cli_new(cli_options: CLI_OPTIONS, configdir: string) {
	if (cli_options.arguments.length >= 2) {
		const newpath = path.join(
			configdir,
			"new",
			cli_options.arguments[0] + ".json"
		);

		if (fs.existsSync(newpath)) {
			try {
				fs.mkdirSync(cli_options.arguments[1], { recursive: true });
				fs.cpSync(
					newpath,
					path.join(
						cli_options.arguments[1],
						cli_options.arguments[0] + ".json"
					)
				);
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
			console.log(`Error creating post. Can't find ${newpath}`);
		}
	}
}
