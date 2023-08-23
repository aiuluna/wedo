"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class Application {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    getApp() {
        return this.app;
    }
    listen() {
        this.app.listen(7002);
    }
    static getInstance() {
        if (!Application.inst) {
            Application.inst = new Application();
        }
        return Application.inst;
    }
}
exports.default = Application;
