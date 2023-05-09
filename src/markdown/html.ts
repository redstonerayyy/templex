import * as fs from "fs";
import * as path from "path";

import { walk_dir } from "../filesystem/filesystem.js";
import { HTMLFile } from "../interfaces/interfaces.js";

export function read_html_files(dir: string): Array<HTMLFile> {
	/*------------ walk directory,read files ------------*/
	const htmlfiles: Array<HTMLFile> = [];
	const paths = walk_dir(dir);
	for (const p of paths) {
		let filecontent: string = "" + fs.readFileSync(p);
		let f: HTMLFile = {
			name: path.parse(p).base,
			filecontent: filecontent,
		};
		htmlfiles.push(f);
	}

	return htmlfiles;
}
