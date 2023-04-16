import * as fs from "node:fs";
import * as path from "node:path";

export function read_html_template(filepath: string) {
	const filecontent = fs.readFileSync(filepath, { encoding: "utf-8" });

	let dynamics = [...filecontent.matchAll(/{{([a-zA-Z0-9". ]*)}}/gm)].map(
		(match: RegExpMatchArray) => {
			return {
				matching: match[0],
				directive: match[1].trim(),
				index: match.index,
			};
		}
	);

	return { filecontent: filecontent, dynamics: dynamics };
}
