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
	publicdir: string;
	staticdir: string;
	processeddir: string;
	contentdir: string;
	layoutdir: string;
	scaffolddir: string;
	site: { [key: string]: any };
}

// TEMPLATING
export interface Dynamic {
	matching: string;
	directive: string;
	index: number;
}

export interface Template {
	filecontent: string;
	dynamics: Array<Dynamic>;
}
