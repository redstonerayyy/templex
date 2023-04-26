// CLI OPTIONS
export interface Option {
	option: string;
	value: string;
}

export interface CLI_OPTIONS {
	command: string;
	arguments: string[];
	flags: string[];
	options: Array<Option>;
}

// CONFIG
export interface Config {
	title: string;
	publicdir: string;
	staticdir: string;
	processeddir: string;
	contentdir: string;
	layoutdir: string;
	site: {
		menu: [
			{
				name: string;
				url: string;
			}
		];
	};
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

// GENERAL
export interface Dictionary {
	[key: string]: any;
}
