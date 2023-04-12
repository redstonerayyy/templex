// CLI options
// -W       watch mode, rebuilt on change

// imports
// import { watch } from "./file/filesystem";
import { make_static } from "./builders/static";
import { make_processed } from "./builders/processed";

// MODE
const watchmode = process.argv[2] == "-W";
console.log(watchmode);

// CONFIG
const publicdir = "./public";

// BUILD
make_static("./static", publicdir);
make_processed("./processed", publicdir);

// WATCH
// cleardirectory("./public");
// copyfoldercontents("./static", "./public");

// const watcher = watch(["./static", "./processed"], []);

// SERVE HTTP
