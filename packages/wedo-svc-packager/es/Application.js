"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
class Application {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(body_parser_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    getApp() {
        return this.app;
    }
    listen(port) {
        this.app.listen(port || 7003);
    }
    static getInstance() {
        if (!Application.inst) {
            Application.inst = new Application();
        }
        return Application.inst;
    }
}
exports.Application = Application;
