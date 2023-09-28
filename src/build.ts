import * as fs from "fs";
import * as path from "path";
import * as util from "./util.js";
import * as transform from "./transform.js";

export default function build() {
	const config = util.read_yml_config("./templex.yml");
	const dirs = config.dirs;

	build_files(dirs.content, dirs);
	build_files(dirs.static, dirs);
}

export function build_files(directory, dirs, options = {}) {
	const files = util.walk_directory(directory);

	for (const file of files) {
		build_file(file, dirs, options);
	}
}

export function build_file(file: string, dirs, options = {}) {
	if (path.extname(file) === ".md") {
		build_markdown(file, dirs, options);
	} else if (
		path.extname(file) === ".scss" ||
		path.extname(file) === ".sass"
	) {
		build_scss(file, dirs);
	} else {
		copy_file(file, dirs);
	}
}

export function build_markdown(filepath: string, dirs, options = {}) {
	const filecontent = fs.readFileSync(filepath, { encoding: "utf-8" });
	let [markdown, metadata] = transform.extract_metadata(filecontent);

	if (metadata["type"] === undefined) return;

	metadata["content"] = transform.markdown_to_html(markdown);
	const layoutpath = path.join(dirs.layout, `${metadata["type"]}.njk`);
	let outputhtml = transform.nunjucks_to_html(layoutpath, metadata);

	outputhtml = apply_options(outputhtml, options);

	let outpath = util.get_output_path(filepath, dirs);
	outpath = outpath.replace(".md", ".html");

	util.write_file(outpath, outputhtml);
}

function apply_options(html: string, options): string {
	if (options.reload) {
		html = transform.append_reload_script(html);
	}
	return html;
}

export function build_scss(filepath: string, dirs) {
	const css = transform.scss_to_css(filepath);

	let outpath = util.get_output_path(filepath, dirs);
	outpath = outpath.replace(".scss", ".min.css");

	util.write_file(outpath, css);
}

export function copy_file(filepath: string, dirs) {
	fs.cpSync(filepath, util.get_output_path(filepath, dirs), {
		recursive: true,
	});
}
