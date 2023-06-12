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
exports.MongoClient = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoConfig_1 = __importDefault(require("./mongoConfig"));
class MongoClient {
    constructor() { }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            mongoose_1.default.connect(mongoConfig_1.default.url, {
                authSource: 'admin',
                auth: { username: mongoConfig_1.default.username, password: mongoConfig_1.default.password }
            }).then(() => {
                console.log(`Connected to ${mongoConfig_1.default.dbName} database`);
                this.db = mongoose_1.default;
            }).catch((error) => {
                console.log('Error connecting to database:', error.message);
            });
        });
    }
    getClient() {
        return this.db;
    }
    static getInstance() {
        if (!MongoClient.inst) {
            MongoClient.inst = new MongoClient();
        }
        return MongoClient.inst;
    }
}
exports.MongoClient = MongoClient;
