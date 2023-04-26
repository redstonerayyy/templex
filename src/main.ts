/*--------------------- CLI ---------------------*/
import { CLI_OPTIONS } from "./interfaces/interfaces";
import { parse_cli_options } from "./cli/cli";
import { cli_new } from "./cli/new";

/*--------------------- CONFIG ---------------------*/
import { Config } from "./interfaces/interfaces";
import { read_config_folder } from "./config/config";

/*--------------------- BUILD ---------------------*/
import { make_clean } from "./util/clean";
import { make_static } from "./static/static";
import { make_processed } from "./processed/processed";
import { makes_sites } from "./markdown/sites";

/*--------------------- CONSTANTS ---------------------*/
const CONFIGDIR: string = "./config";
const EXECUTIONDIR: string = process.cwd();

/*--------------------- CLI OPTIONS ---------------------*/
const cli_options: CLI_OPTIONS = parse_cli_options();

if (cli_options.command == "new") cli_new(cli_options, CONFIGDIR);

/*--------------------- CONFIG ---------------------*/
const config = read_config_folder(CONFIGDIR);

// RUNTIME

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
