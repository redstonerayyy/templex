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
