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
exports.UploadDao = void 0;
const stream_1 = require("stream");
const Oss_1 = __importDefault(require("../Oss"));
class UploadDao {
    saveFileByStream(fileName, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const oss = Oss_1.default.getInstance();
            const stream = new stream_1.Readable();
            stream.setEncoding('utf-8');
            stream.push(content);
            stream.push(null);
            yield oss.putStream(fileName, stream);
            return true;
        });
    }
    saveFile(fileName, filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const oss = Oss_1.default.getInstance();
            try {
                yield oss.put(fileName, filePath);
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
}
exports.UploadDao = UploadDao;
