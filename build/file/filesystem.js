"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watch = exports.walk = void 0;
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const chokidar = __importStar(require("chokidar"));
function* walk(dir) {
    for (const p of fs.opendirSync(dir)) {
        const entry = path.join(dir, p.name);
        if (p.isDirectory())
            yield* walk(entry);
        else if (p.isFile())
            yield entry;
    }
}
exports.walk = walk;
function watch(directorypaths, filepaths) {
    const watcher = chokidar.watch(directorypaths.concat(filepaths), {
        persistent: true,
    });
    return watcher;
}
exports.watch = watch;
