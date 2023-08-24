import * as path from "path";
import * as fs from "fs";
import * as url from "url";

import { walk_dir } from "../filesystem/filesystem.js";
import { Config } from "../interfaces/interfaces.js";

export default function inject_dev_scripts(config: Config, publicdir: string) {
	/*------------ copy dev scripts ------------*/
	const scriptpath = path.join(
		path.dirname(url.fileURLToPath(import.meta.url)),
		"_dev"
	);
	const devpath = path.join(publicdir, "_dev");
	if (!fs.existsSync(devpath)) fs.mkdirSync(devpath);

	const scriptnames = [];

	for (const devscript of fs.readdirSync(scriptpath, {
		withFileTypes: true,
	})) {
		if (path.extname(devscript.name) === ".js") {
			fs.copyFileSync(
				path.join(devscript.path, devscript.name),
				path.join(devpath, devscript.name)
			);
			scriptnames.push(devscript.name);
		}
	}

	const publicfiles = [...walk_dir(publicdir)];

	for (const pfile of publicfiles) {
		if (path.extname(pfile) === ".html") {
			for (const s of scriptnames) {
				fs.appendFileSync(
					pfile,
					`<script >const pull = setInterval(async () => {
                    const res = await fetch("/_reload");
                    const data = await res.text();
                    if (data === "no") {
                    } else if (data === "yes") {
                        window.location.reload();
                    }
                }, 1000);</script>`
				);
			}
		}
	}
}
