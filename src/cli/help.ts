// gives help for the cli commands
export default function cli_help() {
	console.log(
		`
These are your CLI options

templex [command] [options | flags | arguments]

commands:
    watch                watch mode, rebuilt on change
    new [path] [type]    create post of [type] at [path]
    help                 print help information for cli
    info                 print info about texmplex

options:
    --configdir [path/to/configdir]
    `
	);
}
