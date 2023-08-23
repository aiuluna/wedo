"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const UploadDao_1 = require("../dao/UploadDao");
class UploadService {
    constructor() {
        this.dao = new UploadDao_1.UploadDao();
    }
    uploadContent(file, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploaded = yield this.dao.saveFileByStream(file, content);
            if (!uploaded) {
                return {
                    success: false,
                    data: '上传失败'
                };
            }
            if (file[0] !== '/') {
                file = '/' + file;
            }
            return {
                success: true,
                data: `https://huzhang-wedo.oss-cn-hangzhou.aliyuncs.com${file}`
            };
        });
    }
    uploadFile(filename, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploaded = yield this.dao.saveFile(filename, file.filepath);
            if (!uploaded) {
                return {
                    success: false,
                    data: '上传失败'
                };
            }
            if (filename[0] !== '/') {
                filename = '/' + filename;
            }
            return {
                success: true,
                data: `https://huzhang-wedo.oss-cn-hangzhou.aliyuncs.com${filename}`
            };
        });
    }
}
exports.UploadService = UploadService;
