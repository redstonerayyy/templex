import * as transform from "./transform.js";
import * as fs from "fs";

// console.log(transform.scss_to_css("static/scss/vars.scss"));

let filecontent = fs.readFileSync("doc/posts/gnu_pass.md", {
	encoding: "utf-8",
});

let [fc, metadata] = transform.extract_metadata(filecontent);

console.log(metadata);

console.log(transform.markdown_to_html(fc));

// console.log(transform.nunjucks_to_html("layout/components/base.njk"));
