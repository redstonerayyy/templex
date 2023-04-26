import Markdown from "markdown-it"; // ("markdown-it");
import hljs from "highlight.js";
import * as fs from "node:fs";

export function render_markdown(filepath: string) {
	const md = new Markdown({});

	let filecontent = fs.readFileSync(filepath, { encoding: "utf-8" });
	let result = md.render(filecontent);

	result =
		// highlight.js cdn links
		`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/tokyo-night-dark.min.css"
        integrity="sha512-dSQLLtgaq2iGigmy9xowRshaMzUHeiIUTvJW/SkUpb1J+ImXOPNGAI7ZC8V5/PiN/XN83B8uIk4qET7AMhdC5Q=="crossorigin="anonymous" referrerpolicy="no-referrer" />\n` +
		`<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js" 
        integrity="sha512-bgHRAiTjGrzHzLyKOnpFvaEpGzJet3z4tZnXGjpsCcqOnAH6VGUx9frc5bcIhKTVLEiCO6vEhNAgx5jtLUYrfA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>` +
		`<script>hljs.highlightAll();</script>` +
		result;

	return result;
}

let res = render_markdown("./src/markdown/test.md");

fs.writeFileSync("./src/markdown/test.html", res, {
	encoding: "utf-8",
});
