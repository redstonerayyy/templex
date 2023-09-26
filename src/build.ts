import * as fs from "fs";
import * as path from "path";
import * as util from "./util.js";

export default function build() {
	const config = util.read_yml_config("./templex.yml");
	const files = util.walk_directory(config.dirs.content);

	util.copy_directory(config.dirs.static, "./public/static");
}

// let filecontent = fs.readFileSync("doc/posts/gnu_pass.md", {
// 	encoding: "utf-8",
// });

// let [fc, metadata] = transform.extract_metadata(filecontent);

// console.log(metadata);

// console.log(transform.markdown_to_html(fc));
