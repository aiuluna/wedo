"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CodeProjectFS_1 = require("../CodeProjectFS");
async function run() {
    await CodeProjectFS_1.CodeProjectFS.createTemplates();
}
run();
