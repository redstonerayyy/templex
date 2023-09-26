---
type: post
---

# Overview of Templex

## What is Templex?

Templex is a tool to build websites/blogs/... using markdown, scss, nunjucks and strategic copying.

## Build Process

Everything is build into a directory, the `publicdir`, to make a static webpage.
It can deployed using a webserver like apache or nginx.

### Folder Mappings

-   static -> public/static
-   processed -> public/processed
-   content/_ -> public/_

### creat post

$ pwd
-> ~/Github/templex
$ node dist/main.js new example/posts/third.md --configdir ./example/config
