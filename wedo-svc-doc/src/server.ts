import Application from "./Application";
import Redis from "./RedisClient";

Application.getInstance().listen()
Redis.getInstance().connect()