"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("./Application");
// import Redis from "./RedisClient";
const UploadController_1 = require("./controller/UploadController");
new UploadController_1.UploadController();
Application_1.Application.getInstance().listen();
// Redis.getInstance().connect();
