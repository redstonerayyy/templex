import Markdown from "markdown-it";
import * as fs from "fs";
import * as path from "path";

import { Config, HTMLFile } from "../interfaces/interfaces.js";
import { read_html_files } from "./html.js";
import { apply_includes } from "./include.js";

/*------------ function to process all markdown files ------------*/
export function make_markdown(config: Config) {
	/*------------ path for layoutdir ------------*/
	const layoutdirpath: string = path.join(config.rootdir, config.layoutdir);

	/*------------ read include files ------------*/
	const includespath: string = path.join(layoutdirpath, "includes");
	const includes: Array<HTMLFile> = read_html_files(includespath);

	/*------------ add includes into templates ------------*/
	const templatespath: string = path.join(layoutdirpath, "templates");
	const templates: Array<HTMLFile> = read_html_files(templatespath);

	apply_includes(includes, templates);

	/*------------ add includes into specials ------------*/
	const specialspath: string = path.join(layoutdirpath, "specials");
	const specials: Array<HTMLFile> = read_html_files(specialspath);

	apply_includes(includes, specials);

	/*------------ add includes into sites ------------*/
	const sitespath: string = path.join(layoutdirpath, "sites");
	const sites: Array<HTMLFile> = read_html_files(sitespath);

	apply_includes(includes, sites);

	/*------------ markdown renderer ------------*/
	const md = new Markdown({});
}
