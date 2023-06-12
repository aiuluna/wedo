"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(require("./Application"));
const MongoClient_1 = require("./MongoClient");
const RedisClient_1 = __importDefault(require("./RedisClient"));
const DocController_1 = __importDefault(require("./controller/DocController"));
new DocController_1.default();
Application_1.default.getInstance().listen();
RedisClient_1.default.getInstance().connect();
MongoClient_1.MongoClient.getInstance().connect();
