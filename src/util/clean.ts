import * as fs from "fs";

// remove the public directory
// to make a clean start for a new build or new watch
export function clean_dir(publicdir: string) {
	if (fs.existsSync(publicdir)) {
		fs.rmSync(publicdir, { recursive: true });
	}

	fs.mkdirSync(publicdir, { recursive: true });
}
