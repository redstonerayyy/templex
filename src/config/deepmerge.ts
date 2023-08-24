import { Config } from "src/interfaces/interfaces.js";

export default function configmerge(
	defaultconfig: Config,
	customizedconfig: Config
) {
	let obj1 = defaultconfig;
	let obj2 = customizedconfig;

	let output = Object.assign({}, obj1);
	Object.keys(obj2).forEach((key) => {
		if (typeof obj2[key] === "object") {
			if (!(key in obj1)) Object.assign(output, { [key]: obj2[key] });
			else output[key] = configmerge(obj1[key], obj2[key]);
		} else {
			Object.assign(output, { [key]: obj2[key] });
		}
	});
	return output;
}
