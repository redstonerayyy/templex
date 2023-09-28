import * as fs from "fs";
import * as path from "path";
import http from "http";
import handler from "serve-handler";
import chokidar from "chokidar";
import * as util from "./util.js";
import * as build from "./build.js";

export default function watch() {
	const config = util.read_yml_config("./templex.yml");
	const dirs = config.dirs;

	build.process_files(dirs.content, dirs, { reload: true });
	build.process_files(dirs.static, dirs, { reload: true });

	let change = false;
	const watcher = chokidar
		.watch([dirs.static, dirs.content, dirs.layout], {
			persistent: true,
		})
		.on("change", (event: string, path: any) => {
			process.stdout.write(`Rebuilding ${event} ...`);
			build.build_markdown(event, dirs, { reload: true });
			process.stdout.write("Done!\n");
			change = true;
		});

	const server = http.createServer((req, res) => {
		if (req.url === "/_reload") {
			if (change) {
				change = false;
				res.writeHead(200, {
					"Content-Type": "text/plain",
				});
				res.end("yes");
				console.log("yes");
			} else {
				res.writeHead(200, {
					"Content-Type": "text/plain",
				});
				res.end("no");
			}
		} else {
			return handler(req, res, {
				public: path.join(dirs.public),
				cleanUrls: true,
			});
		}
	});

	server.listen(8080, () => {
		console.log("Running at http://localhost:8080");
	});
}
