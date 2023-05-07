/*--------------------- CLI ---------------------*/
import { CliOptions } from "./interfaces/interfaces.js";
import { parse_cli_options } from "./cli/cli.js";
import cli_watch from "./cli/watch.js";
import cli_build from "./cli/build.js";
import cli_new from "./cli/new.js";
import cli_info from "./cli/info.js";
import cli_help from "./cli/help.js";
import cli_clean from "./cli/clean.js";

/*--------------------- CONFIG ---------------------*/
import * as path from "path";
import { Config } from "./interfaces/interfaces.js";
import { read_config_folder } from "./config/config.js";

/*--------------------- CONSTANTS ---------------------*/
let CONFIGDIR: string = "./config";
const VERSION = "0.1.0";
const EXECUTIONDIR: string = process.cwd();

/*--------------------- CLI OPTIONS ---------------------*/
const cli_options: CliOptions = parse_cli_options();

if (Object.keys(cli_options.options).includes("configdir"))
	CONFIGDIR = cli_options.options["configdir"];

/*--------------------- EXECUTE COMMAND WITHOUT CONFIG ---------------------*/
if (cli_options.command == "") {
	cli_help();
	process.exit();
}

/*--------------------- READ CONFIG ---------------------*/
const config: Config = read_config_folder(CONFIGDIR, EXECUTIONDIR);

/*--------------------- EXECUTE COMMAND WITH CONFIG ---------------------*/
if (cli_options.command == "watch") cli_watch(cli_options, config);
if (cli_options.command == "build") cli_build(cli_options, config);
if (cli_options.command == "new") cli_new(cli_options, config);
if (cli_options.command == "info") cli_info(config, VERSION);
if (cli_options.command == "clean") cli_clean(config);
