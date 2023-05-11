import * as yaml from "yaml";

export function parse_metadata(mdfilecontent: string) {
	/*------------ get metadata string if present------------*/
	let match: RegExpMatchArray = mdfilecontent.match(
		/---[ \n]*([^-]*)[ \n]*---/s
	);
	let metadataraw: string = match !== null ? match[1] : null;

	/*------------ replace all metadata sections if present ------------*/
	mdfilecontent = mdfilecontent.replaceAll(/---[ \n]*(.*)[ \n]*---/gs, "");

	/*------------ parse metadata ------------*/
	if (metadataraw === null) return {};

	let metadata: { [key: string]: any } = yaml.parse(metadataraw);

	return metadata;
}
