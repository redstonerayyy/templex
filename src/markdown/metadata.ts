import * as yaml from "yaml";

export function extract_metadata(mdfilecontent: string) {
	/*------------ get metadata string if present------------*/
	let match: RegExpMatchArray = mdfilecontent.match(
		/---[ \n]*([^-]*)[ \n]*---/s
	);
	let metadataraw: string = match !== null ? match[1] : null;

	/*------------ replace all metadata sections if present ------------*/
	let newmdcontent = mdfilecontent.replace(/---[ \n]*(.*)[ \n]*---/s, "");

	/*------------ parse metadata ------------*/
	if (metadataraw === null) return [{}, newmdcontent];

	let metadata = yaml.parse(metadataraw);

	return [metadata, newmdcontent];
}
