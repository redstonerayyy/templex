import * as fs from "node:fs";

export function make_clean(publicdir: string) {
	if (fs.existsSync(publicdir)) {
		fs.rmSync(publicdir, { recursive: true });
	}

	fs.mkdirSync(publicdir, { recursive: true });
}
