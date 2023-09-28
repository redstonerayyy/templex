import * as yaml from "yaml";
import * as fs from "fs";
import * as path from "path";

export function parse_argv(argv: string[]): string[] {
	if (process.argv.length > 2) {
		return argv.slice(2);
	}
	return [];
}

export function read_yml_config(filepath: string) {
	const filecontent = fs.readFileSync(filepath, {
		encoding: "utf-8",
	});

	return yaml.parse(filecontent);
}

export function* walk_directory(directory: string): IterableIterator<string> {
	for (const p of fs.readdirSync(directory, { withFileTypes: true })) {
		const entry = path.join(directory, p.name);
		if (p.isDirectory()) yield* walk_directory(entry);
		else if (p.isFile()) yield entry;
	}
}

export function get_output_path(filepath: string, dirs) {
	const splitted = filepath.split(path.sep);
	const content_dir_name = dirs.content.replace(/^(?:\.+\/)+/, "");
	const route_path = splitted
		.slice(splitted.indexOf(content_dir_name) + 1)
		.join(path.sep);
	return path.join(dirs.public, route_path);
}

export function write_file(filepath: string, filecontent: string) {
	if (!fs.existsSync(path.dirname(filepath)))
		fs.mkdirSync(path.dirname(filepath), { recursive: true });
	fs.writeFileSync(filepath, filecontent, {
		encoding: "utf-8",
	});
}

export function copy_directory(origin: string, destination: string) {
	fs.cpSync(origin, destination, {
		recursive: true,
	});
}

export function remove_directory(directory: string) {
	if (fs.existsSync(directory)) {
		fs.rmSync(directory, { recursive: true });
	}
}
