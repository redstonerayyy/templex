---
title: Markdown Syntax for Templex
releasedate: "2.10.23"
lastchanged: "2.10.23"
type: post
summary: "Explains how to write Markdown for Templex. Gives many examples. It's a bit longer."
---

## Markdown Syntax for Templex

Templex uses `markdown-it` for markdown to HTML conversion, so all common markdown
feature are supported.

### Metadata

Templex allows for the configuration of Metadata which will be used in nunjucks when
apllying templating. When building the `type` property is the template which Templex
tries to apply. In this example the template should be located at `layout/post.njk`.
Variables such as `title`, `releasedate`, ... could then be used in `post.njk`.
Be aware that `-` inside of the metadata block will be ignored and are not allowed.

#### Example Metadata

```yaml
---
title: Markdown Syntax for Templex
releasedate: "2.10.23"
lastchanged: "2.10.23"
type: post
summary: "Explains how to write Markdown for Templex. Gives many examples. It's a bit longer."
---
```

[Back to Index](./index.html)
