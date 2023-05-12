# Wedo低代码平台

## 事前准备
1. 安装 `pm2` 和 `ts-node`

   ```
   npm install pm2 -g
   npm install ts-node -g
   ```

2. 安装 `docker` 、 `redis`、 `mongodb`，启动 `redis` 服务

   ```
   docker pull redis
   docker run --name local-redis -p 6379:6379 -d redis redis-server --requirepass huzhang6
   ```

   注意：需要修改 `redis` 的密码，这里示例使用的密码是 `huzhang6`。

## 启动服务
在根目录的 `scripts/hydra` 目录下执行以下命令：

```
yarn dev --name @wedo/xxx [xxx表示server名称]
```

例如：

```
yarn dev --name @wedo/svc-packager
```
脚本将通过 `pm2` 启动该服务。