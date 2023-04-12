import * as fs from "node:fs";
import * as path from "node:path";
import * as sass from "sass";

export function process_sass(filepath: string, publicdir: string) {
	let css = sass.compile(filepath, {
		style: "compressed",
	}).css;

	let outpath =
		publicdir +
		filepath.substring(filepath.indexOf("/" + 1)) +
		path.parse(filepath).name +
		".css";

	console.log(outpath);
	fs.writeFileSync(outpath, css);
}
