import * as util from "./util.js";
import build from "./build.js";
import watch from "./watch.js";
import template from "./template.js";

const args = util.parse_argv(process.argv);
const command = args[0];

if (command === "build") build();
if (command === "watch") watch();
if (command === "new") template(args);
