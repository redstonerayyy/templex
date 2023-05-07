import Markdown from "markdown-it"; // ("markdown-it");
import * as fs from "fs";

export function render_markdown(filepath: string) {
	const md = new Markdown({});

	let filecontent = fs.readFileSync(filepath, { encoding: "utf-8" });
	let result = md.render(filecontent);

	return result;
}
