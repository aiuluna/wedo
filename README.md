# wedo低代码平台

### 事前准备
- 安装pm2和ts-node
  ```
  npm install pm2 -g
  npm install ts-node -g
  ```

- 安装docker和redis
  ```
  docker pull redis
  docker run --name local-redis -p 6379:6379 -d redis redis-server --requirepass huzhang6
  ```
