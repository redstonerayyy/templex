import * as fs from "fs";
import * as path from "path";

import { HTMLFile } from "../interfaces/interfaces.js";

/*------------ copy include files into other files ------------*/
export function apply_includes(
	includes: Array<HTMLFile>,
	files: Array<HTMLFile>
) {
	for (const file of files) {
		let includetags: Array<{ [key: string]: string }> = [
			...file.filecontent.matchAll(
				/{{ *include *"([a-zA-Z0-9.-_ ]*)" *}}/gm
			),
		].map((match: RegExpMatchArray) => {
			return {
				matchstring: match[0],
				includefile: match[1].trim(),
			};
		});

		for (const itag of includetags) {
			let includecontent = includes.find(
				(el) => el.name == itag.includefile
			).filecontent;

			file.filecontent = file.filecontent.replace(
				itag.matchstring,
				includecontent
			);
		}
	}
}
