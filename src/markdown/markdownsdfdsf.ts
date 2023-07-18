import Markdown from "markdown-it";
import * as fs from "fs";
import * as path from "path";

import { Config, HTMLFile } from "../interfaces/interfaces.js";
import { read_html_files } from "./html.js";
import { apply_includes } from "./include.js";
import { walk_dir } from "../filesystem/filesystem.js";

/*------------ function to process all markdown files ------------*/
export function build_pages(config: Config, publicdir: string) {
	/*------------ path for layoutdir ------------*/
	const layoutdirpath: string = path.join(config.rootdir, config.layoutdir);

	/*------------ read include files ------------*/
	const includespath: string = path.join(layoutdirpath, "includes");
	const includes: Array<HTMLFile> = read_html_files(includespath);

	/*------------ add includes into templates ------------*/
	const templatespath: string = path.join(layoutdirpath, "templates");
	const templates: Array<HTMLFile> = read_html_files(templatespath);
	const layouts = templates.map((template) => path.parse(template.name).name);

	apply_includes(includes, templates);

	/*------------ add includes into specials ------------*/
	const specialspath: string = path.join(layoutdirpath, "specials");
	const specials: Array<HTMLFile> = read_html_files(specialspath);

	apply_includes(includes, specials);

	/*------------ add includes into sites ------------*/
	const sitespath: string = path.join(layoutdirpath, "sites");
	const sites: Array<HTMLFile> = read_html_files(sitespath);

	apply_includes(includes, sites);

	/*------------ get content files ------------*/
	const contentdir = path.join(config.rootdir, config.contentdir);

	const contentfiles = [...walk_dir(contentdir)];

	const nonmarkdownfiles = contentfiles.filter(
		(file) => path.extname(file) !== ".md"
	);

	const markdownfiles = contentfiles.filter(
		(file) => path.extname(file) == ".md"
	);

	/*------------ for each non markdown file ------------*/
	// just copy file
	// overwrite other files
	for (const nmdfile of nonmarkdownfiles) {
		const splitted = nmdfile.split(path.sep);
		const outpath = path.join(
			publicdir,
			splitted.slice(splitted.indexOf("content") + 1).join(path.sep)
		);

		if (!fs.existsSync(path.dirname(outpath)))
			fs.mkdirSync(path.dirname(outpath));

		fs.copyFileSync(nmdfile, outpath);
	}

	/*------------ markdown renderer ------------*/
	const md = new Markdown({});

	/*------------ for each markdown file ------------*/
	// get metadata
	// determine html files to use
	// insert md content into html template
	// use nunjucks to replace variables
}
