/*--------------------- CLI OPTIONS ---------------------*/
// watch                watch mode, rebuilt on change
// new [path] [type]    create post of [type] at [path]
// help                 print help information for cli
// info                 print info about texmplex

import { CliOptions } from "../interfaces/interfaces";

// available commands
const commands: string[] = ["watch", "build", "new", "info"];

// parse the cli arguments
export function parse_cli_options(): CliOptions {
	// initialize
	const args: string[] = process.argv.slice(2); // running with node dist/main.js

	let cli_options: CliOptions = {
		command: "",
		arguments: [],
		flags: [],
		options: [],
	};

	// are there any arguments?
	if (!args.length) return cli_options;

	// check if there is a command
	if (!commands.includes(args[0])) return cli_options;
	cli_options.command = args[0];

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
