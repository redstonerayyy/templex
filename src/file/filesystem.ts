import * as fs from "node:fs";
import * as path from "node:path";
import * as chokidar from "chokidar";

// export function rmdir(dir: string) {
// 	if (fs.existsSync(dir)) {
// 		fs.rmSync(dir, { recursive: true });
// 	}
// }

// export function mkdir(dir: string) {
// 	fs.mkdirSync(dir, { recursive: true });
// }

export function* walk(dir: string): IterableIterator<string> {
	for (const p of fs.opendirSync(dir)) {
		const entry = path.join(dir, p.name);
		if (p.isDirectory()) yield* walk(entry);
		else if (p.isFile()) yield entry;
	}
}

export function watch(directorypaths: string[], filepaths: string[]) {
	const watcher = chokidar.watch(directorypaths.concat(filepaths), {
		persistent: true,
	});

	return watcher;
}
