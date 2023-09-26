import * as fs from "fs";
import * as path from "path";
import * as util from "./util.js";

export default function build() {
	const config = util.read_yml_config("./templex.yml");

	process_content(config.dirs);
	process_static(config.dirs);
}

function process_content(dirs) {
	const files = util.walk_directory(dirs.content);

	for (const file of files) {
		if (path.extname(file) === ".md") {
			transforms_markdown(file, dirs.public);
		} else {
			copy_file(file, dirs.public);
		}
	}
}

function transforms_markdown(filepath: string, dirs) {}

function copy_file(filepath: string, dirs) {
	fs.copyFileSync(filepath, path.join(dirs.public));
}

function process_static(directories) {}
// let filecontent = fs.readFileSync("doc/posts/gnu_pass.md", {
// 	encoding: "utf-8",
// });

// let [fc, metadata] = transform.extract_metadata(filecontent);

// console.log(metadata);

// console.log(transform.markdown_to_html(fc));
