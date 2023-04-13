// imports
// import { watch } from "./file/filesystem";
import { read_config } from "./config/config";
import { Config } from "./config/interfaces";
import { make_clean } from "./builders/clean";
import { make_static } from "./builders/static";
import { make_processed } from "./builders/processed";

// CLI options
// -W       watch mode, rebuilt on change
// MODE
const watchmode: boolean = process.argv[2] == "-W";

// CONFIG
const publicdir: string = "./public";
const executiondir: string = process.cwd();

// READ CONFIG FILES
const config: Config = read_config("./config");

// BUILD
make_clean(publicdir);
make_static("./static", publicdir);
make_processed("./processed", publicdir);
makes_sites(config, "./content", "./layout");

// WATCH
// cleardirectory("./public");
// copyfoldercontents("./static", "./public");

// const watcher = watch(["./static", "./processed"], []);

// SERVE HTTP
