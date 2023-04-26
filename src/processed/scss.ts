import * as fs from "node:fs";
import * as path from "node:path";
import * as sass from "sass";

// process a scss or sass file
// takes in a filepath and outputs the file to
// public/[filepath of sass file without /processed/]/[sass filename].min.css
export function process_sass(filepath: string, publicdir: string) {
	let css = sass.compile(filepath, {
		style: "compressed",
	}).css;

	// write the css output to file, create folder structure
	// if not existend
	let outpath = path.join(
		publicdir,
		path.join(...path.dirname(filepath).split("/").slice(1)),
		path.parse(filepath).name + ".css"
	);

	if (!fs.existsSync(path.dirname(outpath))) {
		fs.mkdirSync(path.dirname(outpath), { recursive: true });
	}

	fs.writeFileSync(outpath, css);
}
