import * as markdown from "markdown-it";
import * as hljs from "highlight.js";
import * as fs from "node:fs";

export function render_markdown(filepath: string) {
	let mdrenderer = new markdown.MarkdownIt();
	let filecontent = fs.readFileSync(filepath, { encoding: "utf-8" });
	let result = mdrenderer.render(filecontent, {
		highlight: function (str: string, lang: string) {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return hljs.highlight(str, { language: lang }).value;
				} catch (__) {}
			}

			return ""; // use external default escaping
		},
	});
	return result;
}

let res = render_markdown("./src/builders/content/markdown/test.md");
fs.writeFileSync("./src/builders/content/markdown/test.html", res, {
	encoding: "utf-8",
});
