import * as fs from "fs";
import * as path from "path";

import { Dictionary, Template } from "../interfaces/interfaces";

export function process_template_includes(
	filename: string,
	template: Template,
	includes: Dictionary
): Template {
	let index = 0;
	while (index < template.dynamics.length) {
		let dynamic = template.dynamics[index];
		let splitted = dynamic.directive.split(" ");
		if (splitted[0] === "include" && splitted.length > 1) {
			// prevent recursion
			let includefilename = splitted[1].replaceAll('"', "");
			if (filename !== includefilename) {
				template.filecontent = template.filecontent.replaceAll(
					dynamic.matching,
					includes[includefilename].filecontent
				);
			} else {
				template.filecontent = template.filecontent.replaceAll(
					dynamic.matching,
					""
				);
				console.log(`Recursion found for ${splitted[1]}. Ignoring it`);
			}

			let deleteindices = [];
			for (let i = 0; i < template.dynamics.length; i++) {
				if (template.dynamics[i].matching == dynamic.matching) {
					deleteindices.push(i);
				}
			}
			deleteindices = deleteindices.reverse();

			for (const delindex of deleteindices) {
				template.dynamics.splice(delindex, 1);
			}
		} else {
			index++;
		}
	}

	return template;
}
