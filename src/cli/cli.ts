// CLI options
// watch                watch mode, rebuilt on change
// new [type] [path]    create new folder at path for the post

import { CLI_OPTIONS } from "./interfaces";

const commands: string[] = ["watch", "new"];

export function parse_cli_options() {
	const args: string[] = process.argv.slice(2);
	if (!args.length) return;

	let cli_options: CLI_OPTIONS = {
		command: "",
		arguments: [],
		flags: [],
		options: [],
	};

	if (commands.includes(args[0])) {
		cli_options.command = args[0];
	}

	for (let i = 1; i < args.length; i++) {
		let currentarg = args[i];
		if (currentarg.substring(0, 2) === "--") {
			cli_options.options.push({
				option: currentarg,
				value: args[i + 1],
			});
			i++;
		} else if (currentarg.substring(0, 1) === "-") {
			cli_options.flags.push(currentarg);
		} else {
			cli_options.arguments.push(currentarg);
		}
	}

	return cli_options;
}
