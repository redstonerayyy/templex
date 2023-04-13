// imports
import { CLI_OPTIONS } from "./cli/interfaces";
import { parse_cli_options } from "./cli/cli";
import { cli_new } from "./cli/new";
import { Config } from "./config/interfaces";
import { read_config } from "./config/config";
import { make_clean } from "./builders/clean";
import { make_static } from "./builders/static";
import { make_processed } from "./builders/processed";

// CONSTANTS
const CONFIGDIR = "./config";

// CLI OPTIONS
const cli_options: CLI_OPTIONS = parse_cli_options();
console.log(cli_options);

if (cli_options.command == "new") cli_new(cli_options, CONFIGDIR);

// CONFIG
const config: Config = read_config(CONFIGDIR);

// RUNTIME
const executiondir: string = process.cwd();

// BUILD
// make_clean(config.publicdir);
// make_static(config.staticdir, config.publicdir);
// make_processed(config.processeddir, config.publicdir);
// makes_sites(config, config.contentdir, config.layoutdir);

// WATCH
// cleardirectory("./public");
// copyfoldercontents("./static", "./public");

// const watcher = watch(["./static", "./processed"], []);

// SERVE HTTP
