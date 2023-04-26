/*--------------------- CLI ---------------------*/
import { CliOptions } from "./interfaces/interfaces";
import { parse_cli_options } from "./cli/cli";
import cli_watch from "./cli/watch";
import cli_build from "./cli/build";
import cli_new from "./cli/new";
import cli_info from "./cli/info";
import cli_help from "./cli/help";

/*--------------------- CONFIG ---------------------*/
import { Config } from "./interfaces/interfaces";
import { read_config_folder } from "./config/config";

/*--------------------- BUILD ---------------------*/
import { make_clean } from "./util/clean";
import { make_static } from "./static/static";
import { make_processed } from "./processed/processed";
import { makes_sites } from "./markdown/sites";

/*--------------------- CONSTANTS ---------------------*/
const CONFIGDIR: string = "./test/config";
const EXECUTIONDIR: string = process.cwd();

/*--------------------- CLI OPTIONS ---------------------*/
const cli_options: CliOptions = parse_cli_options();

/*--------------------- CONFIG ---------------------*/
const config: Config = read_config_folder(CONFIGDIR);

/*--------------------- EXECUTE COMMAND ---------------------*/
if (cli_options.command == "watch") cli_watch(cli_options, config);
if (cli_options.command == "build") cli_build(cli_options, config);
if (cli_options.command == "new") cli_new(cli_options, config);
if (cli_options.command == "info") cli_info(config);
if (cli_options.command == "") cli_help();

// watch
// build
