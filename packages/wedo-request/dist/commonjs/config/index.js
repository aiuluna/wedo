"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_dev_1 = __importDefault(require("./config.dev"));
const config_dev_2 = __importDefault(require("./config.dev"));
const config = process.env.NODE_ENV === "production"
    ? config_dev_2.default
    : config_dev_1.default;
exports.default = config;
