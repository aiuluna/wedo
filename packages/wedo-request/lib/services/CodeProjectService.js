"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeProjectService = void 0;
const config_1 = __importDefault(require("../config"));
const standard_1 = require("../standard");
class CodeProjectService {
    async put(user, name, values) {
        return await (0, standard_1.fetchStandrd)(config_1.default.codeProjectURL(user, name), {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(values)
        });
    }
    async get(user, name) {
        return await (0, standard_1.fetchStandrd)(config_1.default.codeProjectURL(user, name), {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        });
    }
}
exports.CodeProjectService = CodeProjectService;
