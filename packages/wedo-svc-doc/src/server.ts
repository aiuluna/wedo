import Application from "./Application";
import { MongoClient } from "./MongoClient";
import Redis from "./RedisClient";
import DocController from "./controller/DocController";

new DocController()
Application.getInstance().listen()
Redis.getInstance().connect()
MongoClient.getInstance().connect()