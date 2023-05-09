"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeProjectRemote = exports.fileRemote = void 0;
const CodeProjectService_1 = require("./services/CodeProjectService");
const FileService_1 = require("./services/FileService");
exports.fileRemote = new FileService_1.FileService();
exports.codeProjectRemote = new CodeProjectService_1.CodeProjectService();
