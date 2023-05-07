import * as fs from "fs";
import * as path from "path";

/*------------ dirs used by e.g. processed are forbidden ------------*/
const forbiddenpaths: Array<string> = ["css"];

/*------------ static files are just copied ------------*/
export function make_static(staticdir: string, publicdir: string) {
	for (const p of fs.readdirSync(staticdir)) {
		if (forbiddenpaths.indexOf(path.basename(p)) == -1) {
			fs.cpSync(path.join(staticdir, p), path.join(publicdir, p), {
				recursive: true,
			});
		}
	}
}
