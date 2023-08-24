import * as path from "path";
import * as fs from "fs";
import * as url from "url";

import { walk_dir } from "../filesystem/filesystem.js";
import { Config } from "../interfaces/interfaces.js";

export default function inject_dev_scripts(config: Config, publicdir: string) {
	const publicfiles = [...walk_dir(publicdir)];

	for (const pfile of publicfiles) {
		if (path.extname(pfile) === ".html") {
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
