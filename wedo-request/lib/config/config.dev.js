"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uploadServiceURL = "http://localhost:7001";
const docServiceURL = "http://localhost:7002";
const config = {
    uploadFileObject: `${uploadServiceURL}/upload-object`,
    uploadFileText: `${uploadServiceURL}/upload-content`,
    codeProjectURL: (user, name) => {
        return `${docServiceURL}/code-project/${user}/${name}`;
    }
};
exports.default = config;
