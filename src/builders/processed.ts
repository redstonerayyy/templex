import * as fs from "node:fs";
import * as path from "node:path";

import { process_sass } from "./processed/scss";
import { walk_dir } from "../file/filesystem";

export function make_processed(processeddir: string, publicdir: string) {
	// walk directory and process files
	const paths = walk_dir(processeddir);
	for (const p of paths) {
		let fileextension = path.extname(p);
		if (fileextension == ".scss" || fileextension === ".sass") {
			process_sass(p, publicdir);
		}
	}
}
