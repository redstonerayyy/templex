import * as fs from "node:fs";
import * as path from "node:path";
import * as sass from "sass";

export function process_sass(filepath: string, publicdir: string) {
	let css = sass.compile(filepath, {
		style: "compressed",
	}).css;

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
