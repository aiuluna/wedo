"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uploadServiceURL = "http://localhost:7001";
const docServiceURL = "http://localhost:7002";
const buildServiceURL = "http://localhost:7003";
const config = {
    uploadFileObject: `${uploadServiceURL}/upload-object`,
    uploadFileText: `${uploadServiceURL}/upload-content`,
    codeProjectURL: (user, name) => {
        return `${docServiceURL}/code-project/${user}/${name}`;
    },
    codeProjectBuildURL: (user, name) => {
        return `${buildServiceURL}/build/${user}/${name}`;
    }
};
exports.default = config;
