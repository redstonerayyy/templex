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
