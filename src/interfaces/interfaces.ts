/*--------------------- CLI OPTiONS ---------------------*/
export interface Option {
	option: string;
	value: string;
}

export interface CliOptions {
	command: string;
	arguments: string[];
	flags: string[];
	options: { [key: string]: string };
}

/*--------------------- CONFIG ---------------------*/
export interface Config {
	title: string;
	configdir: string;
	executiondir: string;
	rootdir: string;
	publicdir: string;
	staticdir: string;
	processeddir: string;
	contentdir: string;
	layoutdir: string;
	scaffolddir: string;
	site: { [key: string]: any };
}

/*------------ TEMPLATING ------------*/
export interface HTMLFile {
	name: string;
	filecontent: string;
}
