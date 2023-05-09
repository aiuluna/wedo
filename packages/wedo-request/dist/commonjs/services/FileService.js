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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const config_1 = __importDefault(require("../config"));
const standard_1 = require("../standard");
const md5 = __importStar(require("md5"));
class FileService {
    async post1(bucket, ext, content) {
        const hash = md5(content);
        const finalFileName = ext ? `${bucket}/${hash}.${ext}` : `${bucket}/${hash}`;
        const res = await (0, standard_1.fetchStandrd)(config_1.default.uploadFileText, {
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                content,
                file: finalFileName
            })
        });
        return res;
    }
    async get(url) {
        let resp = null;
        try {
            resp = await fetch(url);
            const text = await resp.text();
            return {
                data: text,
                success: true,
                httpCode: resp.status
            };
        }
        catch (error) {
            return {
                message: error.toString(),
                success: false,
                httpCode: resp ? resp.status : 400
            };
        }
    }
}
exports.FileService = FileService;
