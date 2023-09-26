import * as fs from "fs";
import * as path from "path";
import * as util from "./util.js";
import * as transform from "./transform.js";

export default function build() {
	const config = util.read_yml_config("./templex.yml");
	const dirs = config.dirs;

	process_files(dirs.content, dirs);
	process_files(dirs.static, dirs);
}

function process_files(directory, dirs) {
	const files = util.walk_directory(directory);

	for (const file of files) {
		if (path.extname(file) === ".md") {
			transform_markdown(file, dirs);
		} else if (
			path.extname(file) === ".scss" ||
			path.extname(file) === ".sass"
		) {
			transform_scss(file, dirs);
		} else {
			copy_file(file, dirs);
		}
	}
}

function transform_markdown(filepath: string, dirs) {
	const filecontent = fs.readFileSync(filepath, { encoding: "utf-8" });
	let [markdown, metadata] = transform.extract_metadata(filecontent);

	if (metadata["type"] === undefined) return;

	metadata["content"] = transform.markdown_to_html(markdown);
	const layoutpath = path.join(dirs.layout, `${metadata["type"]}.njk`);
	const outputhtml = transform.nunjucks_to_html(layoutpath, metadata);

	let outpath = util.get_output_path(filepath, dirs);
	outpath = outpath.replace(".md", ".html");

	util.write_file(outpath, outputhtml);
}

function transform_scss(filepath: string, dirs) {}

function copy_file(filepath: string, dirs) {
	fs.cpSync(filepath, util.get_output_path(filepath, dirs), {
		recursive: true,
	});
}

function process_static(directories) {}
