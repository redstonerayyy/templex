import * as fs from "node:fs";
import * as path from "node:path";

import { process_sass } from "./processed/scss";
import { walk_dir } from "../file/filesystem";

// for each file check the extension
// and process it accordingly
export function make_processed(processeddir: string, publicdir: string) {
	// walk directory and process files
	const paths = walk_dir(processeddir);
	for (const p of paths) {
		let fileextension = path.extname(p);
		// .sass/.scss to .min.css
		if (fileextension === ".scss" || fileextension === ".sass") {
			process_sass(p, publicdir);
		}
	}
}
