export interface Dictionary {
	[key: string]: any;
}

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
