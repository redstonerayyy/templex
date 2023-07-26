import * as fs from "fs";
import * as path from "path";
import * as sass from "sass";

/*------------ process a scss or sass file ------------*/
// takes in a filepath and outputs the file to publicdir/css
// processed/**/[name].scss -> publicdir/css/[name].min.css
export function process_sass(filepath: string, publicdir: string) {
	/*------------ compile sass file ------------*/
	let css = sass.compile(filepath, {
		style: "compressed",
	}).css;

	/*------------ write the css output to file, create folder structure ------------*/
	// remove
	let outpath = path.join(
		publicdir,
		"processed",
		path.parse(filepath).name + ".min.css"
	);

	if (!fs.existsSync(path.dirname(outpath))) {
		fs.mkdirSync(path.dirname(outpath), { recursive: true });
	}

	fs.writeFileSync(outpath, css);
}
