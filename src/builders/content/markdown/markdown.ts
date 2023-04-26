import Markdown from "markdown-it"; // ("markdown-it");
import hljs from "highlight.js";

// hljs.addPlugin();
import * as fs from "node:fs";

export function render_markdown(filepath: string) {
	const md = new Markdown({
		highlight: function (str, lang) {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return hljs.highlight(str, { language: lang }).value;
				} catch (__) {}
			}

			return ""; // use external default escaping
		},
	});
	let filecontent = fs.readFileSync(filepath, { encoding: "utf-8" });
	let result = md.render(filecontent);
	return result;
}

let res = render_markdown("./src/builders/content/markdown/test.md");
res =
	`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css">` +
	`<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>` +
	`<script src="https://cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.8.0/highlightjs-line-numbers.min.js"></script>` +
	res;

console.log(res);

fs.writeFileSync("./src/builders/content/markdown/test.html", res, {
	encoding: "utf-8",
});
