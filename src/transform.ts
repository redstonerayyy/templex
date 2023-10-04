import * as sass from "sass";
import Markdown from "markdown-it";
import nunjucks from "nunjucks";
import hljs from "highlight.js";
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
		langPrefix: "",
		typographer: true,
	});

	return md.render(mdcontent);
}

export function nunjucks_to_html(nunjuckspath: string, data): string {
	const env = nunjucks.configure(path.dirname(nunjuckspath), {
		autoescape: false,
	});

	const template = env.getTemplate(path.basename(nunjuckspath), true);
	return template.render(data);
}

export function render_html(htmlstring: string, data): string {
	return nunjucks.renderString(htmlstring, data);
}

export function extract_metadata(mdcontent: string): [string, object] {
	const regex = /---[ \n]*([^-]*)[ \n]*---/s;
	const match = mdcontent.match(regex);

	let newmdcontent = mdcontent.replace(regex, "");

	if (match === null) return [newmdcontent, {}];

	return [newmdcontent, yaml.parse(match[1])];
}

export function highlight_sourcecode(html: string): string {
	const code_regex = /<code *class="([a-z-]*)">([^<]*)<\/code>/gs;
	const matchings = html.matchAll(code_regex);

	for (const match of matchings) {
		const code = match[2];
		const lang = match[1].split("-")[1];

		const hightlighted = match[0].replace(
			code,
			hljs.highlight(code, { language: lang }).value
		);
		html = html.replace(match[0], hightlighted);
	}
	return html;
}

export function append_reload_script(html: string): string {
	return (
		html +
		`<script>
        const pull = setInterval(async () => {
            const res = await fetch("/_reload");
            const data = await res.text();
            if (data === "yes") window.location.reload();
        }, 250);
        </script>`
	);
}
