"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const pageSchema = new mongoose_1.default.Schema({
    owner: {
        name: String
    },
    name: String,
    url: String
});
exports.Page = mongoose_1.default.model('Page', pageSchema);
