import { createClient } from 'redis';

class Redis {
  static inst: Redis;
  private client;
  private isConnected: boolean = false;

  private constructor() {
    this.client = createClient({
      url: 'redis://:huzhang6@local-redis:6379'
    });
    this.client.on('error', err => {
      console.log('Redis Client Error', err);
      this.isConnected = false;
    });
    this.client.on('connect', () => {
      console.log('redis is connect')
      this.isConnected = true
    })

  }

  public getRedisClient() {
    return this.client
  }

  public async connect() {
    await this.client.connect()
    this.isConnected = true
  }

  public async disconnect() {
    await this.client.disconnect()
    this.isConnected = false
  }

  public async setData(key: string, value: any) {
    await this.client.set(key, value)
  }

  public async getData(key: string) {
    return await this.client.get(key)
  }

  public isRedisConnected() {
    return this.isConnected;
  }

  static getInstance() {
    if (Redis.inst) return Redis.inst;
    Redis.inst = new Redis();
    return Redis.inst;
  }

}

export default Redis;