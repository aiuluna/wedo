import { Readable } from "stream";
import OSSService from "../Oss"
import Redis from "../RedisClient"

export class UploadDao {
  async saveFile(fileName: string, content: string): Promise<boolean> {
    const oss = OSSService.getInstance();
    const stream = new Readable();
    stream.setEncoding('utf-8');
    stream.push(content);
    stream.push(null);
    await oss.putStream(fileName, stream);
    // if (fileName[0] !== '/') {
    //   fileName = '/' + fileName
    // }
    // const client = Redis.getInstance();
    // await client.setData(fileName, JSON.stringify({
    //   content
    // }))
    return true
  }
}