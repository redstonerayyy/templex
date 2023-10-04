---
title: "Code Hightlighting"
releasedate: "{{ current_date }}"
lastchanged: "{{ current_date }}"
type: post
summary: "Explains how to setup syntax highlighting for source code for Templex."
---

## Code Hightlighting

Code highlighting uses `highlight.js` for applying HTML tags. It is then needed to
include a matching stylesheet somewhere (e. g. in your layout files) to properly utilize ist.
It could look like this

```ts
export function highlight_sourcecode(html: string, lang: string): string {
	if (lang && hljs.getLanguage(lang)) {
		try {
			return hljs.highlight(html, { language: lang }).value;
		} catch (__) {}
	}

	return "";
}
```

[Back to Index](./index.html)
