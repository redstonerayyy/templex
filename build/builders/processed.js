"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.make_processed = void 0;
const filesystem_1 = require("../file/filesystem");
function make_processed(processeddir, publicdir) {
    const paths = (0, filesystem_1.walk)(processeddir);
    for (const p of paths) {
        console.log(p);
    }
}
exports.make_processed = make_processed;
