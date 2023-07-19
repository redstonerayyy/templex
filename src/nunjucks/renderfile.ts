import nunjucks from "nunjucks";
import * as path from "path";

export function render_file(
	rootdir: string,
	filepath: string,
	filldata: { key: any }
) {
	const env = nunjucks.configure(rootdir, {
		autoescape: false,
	});
	const template = env.getTemplate(
		path.join("templates", path.basename(filepath)),
		true
	);
	const res = template.render(filldata);

	return res;
}
