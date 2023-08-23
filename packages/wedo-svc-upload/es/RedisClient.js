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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
class Redis {
    constructor() {
        this.isConnected = false;
        this.client = (0, redis_1.createClient)({
            password: 'huzhang6'
        });
        this.client.on('error', err => {
            console.log('Redis Client Error', err);
            this.isConnected = false;
        });
        this.client.on('connect', () => {
            console.log('redis is connect');
            this.isConnected = true;
        });
    }
    getRedisClient() {
        return this.client;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect();
            this.isConnected = true;
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.disconnect();
            this.isConnected = false;
        });
    }
    setData(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.set(key, value);
        });
    }
    getData(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.get(key);
        });
    }
    isRedisConnected() {
        return this.isConnected;
    }
    static getInstance() {
        if (Redis.inst)
            return Redis.inst;
        Redis.inst = new Redis();
        return Redis.inst;
    }
}
exports.default = Redis;
