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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ali_oss_1 = __importDefault(require("ali-oss"));
const ossConfig_1 = __importDefault(require("./ossConfig"));
class OSSService {
    constructor() {
        this.client = new ali_oss_1.default(Object.assign({}, ossConfig_1.default));
    }
    static getInstance() {
        if (!OSSService.Inst) {
            OSSService.Inst = new OSSService();
        }
        return OSSService.Inst;
    }
    put(filename, filepath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.client.put(filename, filepath);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    putStream(fileName, stream) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log('filename', fileName)
                // console.log('stream', stream)
                const result = yield this.client.putStream(fileName, stream);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = OSSService;
