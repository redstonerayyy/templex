import * as fs from "node:fs";
import * as path from "node:path";
import * as chokidar from "chokidar";

// return the filepaths of all files in this directory and
// of all of it's subdirectories
export function* walk_dir(dir: string): IterableIterator<string> {
	for (const p of fs.readdirSync(dir, { withFileTypes: true })) {
		const entry = path.join(dir, p.name);
		if (p.isDirectory()) yield* walk_dir(entry);
		else if (p.isFile()) yield entry;
	}
}
