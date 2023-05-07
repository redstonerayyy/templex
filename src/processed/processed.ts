import * as fs from "fs";
import * as path from "path";

import { process_sass } from "./scss";
import { walk_dir } from "../filesystem/filesystem";

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
