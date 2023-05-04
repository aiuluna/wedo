import Redis from "../RedisClient"

export class UploadDao {
  async saveFile(fileName: string, content: string): Promise<boolean> {
    const client = Redis.getInstance();
    await client.setData(fileName, JSON.stringify({
      content
    }))
    return true
  }
}