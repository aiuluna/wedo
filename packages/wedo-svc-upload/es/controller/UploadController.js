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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const Application_1 = require("../Application");
const UploadService_1 = require("../service/UploadService");
const formidable_1 = __importDefault(require("formidable"));
const crypto_js_1 = __importStar(require("crypto-js"));
const fs_1 = __importDefault(require("fs"));
var HTTPMethod;
(function (HTTPMethod) {
    HTTPMethod[HTTPMethod["GET"] = 0] = "GET";
    HTTPMethod[HTTPMethod["POST"] = 1] = "POST";
    HTTPMethod[HTTPMethod["PUT"] = 2] = "PUT";
    HTTPMethod[HTTPMethod["DELETE"] = 3] = "DELETE";
})(HTTPMethod || (HTTPMethod = {}));
class UploadController {
    constructor() {
    }
    index(req, res) {
        res.send('hello wedo-svc-upload');
    }
    uploadContent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { file, content } = req.body;
            const service = new UploadService_1.UploadService();
            const data = yield service.uploadContent(file, content);
            res.send(data);
        });
    }
    uploadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const form = new formidable_1.default.IncomingForm();
                form.parse(req, (err, fields, files) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        return res.status(500).send({
                            success: false,
                            data: '上传失败'
                        });
                    const file = files.file;
                    const service = new UploadService_1.UploadService();
                    const upFile = isSingleFile(file) ? file : file[0];
                    const sha1sum = (0, crypto_js_1.SHA1)(fs_1.default.readFileSync(upFile.filepath, 'utf-8')).toString(crypto_js_1.default.enc.Hex);
                    const ext = upFile.mimetype.split('/').pop();
                    const filename = `/img/${sha1sum}.${ext}`;
                    const data = yield service.uploadFile(filename, upFile);
                    res.send(data);
                }));
            }
            catch (error) {
                res.send({
                    success: false,
                    message: error
                });
            }
        });
    }
}
__decorate([
    restful(HTTPMethod.GET, '/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "index", null);
__decorate([
    restful(HTTPMethod.POST, '/upload-content'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadContent", null);
__decorate([
    restful(HTTPMethod.POST, '/upload-object'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
exports.UploadController = UploadController;
function restful(method, path) {
    return function (target, propertyKey, descriptor) {
        const application = Application_1.Application.getInstance();
        const app = application.getApp();
        switch (method) {
            case HTTPMethod.GET:
                app.get(path, descriptor.value.bind(target));
                break;
            case HTTPMethod.POST:
                app.post(path, descriptor.value.bind(target));
                break;
            case HTTPMethod.PUT:
                app.put(path, descriptor.value.bind(target));
                break;
            default:
                break;
        }
    };
}
function isSingleFile(file) {
    return !Array.isArray(file);
}
