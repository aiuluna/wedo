import { Application } from "./Application";
import Redis from "./RedisClient";
import { UploadController } from "./controller/UploadController";

new UploadController();
Application.getInstance().listen();
Redis.getInstance().connect();
