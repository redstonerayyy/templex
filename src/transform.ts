import * as sass from "sass";
import Markdown from "markdown-it";
import nunjucks from "nunjucks";
import * as yaml from "yaml";

import * as path from "path";

export function scss_to_css(filepath: string): string {
	return sass.compile(filepath, {
		style: "compressed",
		sourceMap: false,
	}).css;
}

export function markdown_to_html(mdcontent: string): string {
	const md = new Markdown({
		html: true,
		linkify: true,
		typographer: true,
	});

	return md.render(mdcontent);
}

export function nunjucks_to_html(filepath: string): string {
	const env = nunjucks.configure(path.dirname(filepath), {
		autoescape: false,
	});

	const template = env.getTemplate(path.basename(filepath), true);
	return template.render();
}

export function extract_metadata(mdcontent: string): [string, object] {
	const regex = /---[ \n]*([^]*)[ \n]*---/s;
	const match = mdcontent.match(regex);

	let newmdcontent = mdcontent.replace(regex, "");

	if (match === null) return [newmdcontent, {}];

	return [newmdcontent, yaml.parse(match[1])];
}
