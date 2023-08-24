import * as fs from "fs";
import * as path from "path";
import http from "http";
import handler from "serve-handler";

import { CliOptions, Config } from "../interfaces/interfaces.js";
import chokidar from "chokidar";
import cli_build from "./build.js";

// build the whole site and watch for file
// changes to rebuild the site efficiently
// and reflect the changes
export default function cli_watch(cli_options: CliOptions, config: Config) {
	/*------------ directories ------------*/
	const rootdir = config.directories.root;

	const staticdir = path.join(rootdir, config.directories.static);
	const processeddir = path.join(rootdir, config.directories.processed);
	const layoutdir = path.join(rootdir, config.directories.layout);
	const contentdir = path.join(rootdir, config.directories.content);

	/*------------ build once before changes ------------*/
	cli_build(cli_options, config);

	/*------------ define watcher ------------*/
	let change = false;
	const watcher = chokidar
		.watch([staticdir, processeddir, layoutdir, contentdir], {
			persistent: true,
		})
		.on("change", (event: string, path: any) => {
			process.stdout.write(`Rebuilding ${event} ...`);
			cli_build(cli_options, config);
			change = true;
			process.stdout.write("Done!\n");
		});

	/*------------ serve files on localhost ------------*/
	const server = http.createServer((req, res) => {
		if (req.url === "/_reload") {
			if (change) {
				change = false;
				res.writeHead(200, {
					"Content-Type": "text/plain",
				});
				res.end("yes");
			} else {
				res.writeHead(200, {
					"Content-Type": "text/plain",
				});
				res.end("no");
			}
		} else {
			return handler(req, res, {
				public: path.join(
					config.directories.root,
					config.directories.public
				),
				cleanUrls: true,
			});
		}
	});

	server.listen(8080, () => {
		console.log("Running at http://localhost:8080!");
	});
}
