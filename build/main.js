"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const static_1 = require("./builders/static");
const processed_1 = require("./builders/processed");
const watchmode = process.argv[2] == "-W";
console.log(watchmode);
const publicdir = "./public";
(0, static_1.make_static)("./static", publicdir);
(0, processed_1.make_processed)("./processed", publicdir);
