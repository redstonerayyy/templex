import * as nunjucks from "nunjucks";
import * as path from "path";

export function render_file(filepath: string, filldata: { key: any }) {
	const parentfolder = path.basename(filepath);

	let env = nunjucks.configure(parentfolder, { autoescape: true });
	let template = env.getTemplate(filepath, true);
	let res = template.render(filldata);
}
