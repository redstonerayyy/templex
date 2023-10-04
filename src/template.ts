import * as fs from "fs";
import * as path from "path";
import * as util from "./util.js";

export default function template(args: string[]) {
	if (args.length < 3) {
		console.log("Provide enough Arguments!");
		return;
	}

	const config = util.read_yml_config("./templex.yml");
	const dirs = config.dirs;

	const type = args[1];
	const targetpath = args[2];

	fs.copyFileSync(
		path.join(dirs.layout, "templates", type + ".md"),
		targetpath
	);
}
