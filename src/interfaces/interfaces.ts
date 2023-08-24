/*--------------------- CLI OPTIONS ---------------------*/
export interface CliOptions {
	command: string;
	arguments: string[];
	flags: string[];
	options: { [key: string]: string };
}

/*--------------------- CONFIG ---------------------*/
export interface Config {
	title: string;
	directories: {
		cwd: string;
		config: string;
		root: string;
		public: string;
		static: string;
		processed: string;
		content: string;
		layout: string;
		themes: string;
		scaffold: string;
	};
	data: { [key: string]: any };
	[key: string]: any; // make typescrpt happy
}

/*------------ TEMPLATING ------------*/
export interface HTMLFile {
	name: string;
	filecontent: string;
}
