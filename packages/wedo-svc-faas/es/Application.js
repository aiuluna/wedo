"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
class Application {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(body_parser_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use(routes_1.default);
    }
    listen(port) {
        this.app.listen(port);
    }
    getApp() {
        return this.app;
    }
    static getInstance() {
        if (!Application.inst) {
            Application.inst = new Application();
        }
        return Application.inst;
    }
}
exports.default = Application;
