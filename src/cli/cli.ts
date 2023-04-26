// CLI options
// watch                watch mode, rebuilt on change
// new [path] [type]    create new folder at path for the post

import { CLI_OPTIONS } from "../interfaces/interfaces";

// available commands
const commands: string[] = ["watch", "new"];

// parse the cli arguments
// TODO: help and info
export function parse_cli_options(): CLI_OPTIONS {
	// initialize
	const args: string[] = process.argv.slice(2);

	let cli_options: CLI_OPTIONS = {
		command: "",
		arguments: [],
		flags: [],
		options: [],
	};

	// are there any arguments?
	if (!args.length) return cli_options;

	// check if there is a command
	if (commands.includes(args[0])) {
		cli_options.command = args[0];
	}

	// parse options e.g. --option value
	// parse flags e.g. -p
	// parse positional arguments
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
