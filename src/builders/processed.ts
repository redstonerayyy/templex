import * as fs from "node:fs";

import { process_sass } from "./processed/scss";
import { walk } from "../file/filesystem";

export function make_processed(processeddir: string, publicdir: string) {
	// walk directory and process files
	const paths = walk(processeddir);
	for (const p of paths) {
		console.log(p);
	}
}
