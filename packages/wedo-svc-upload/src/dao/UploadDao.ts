import { Readable } from "stream";
import OSSService from "../Oss"
import Redis from "../RedisClient"

export class UploadDao {
  async saveFileByStream(fileName: string, content: string): Promise<boolean> {
    const oss = OSSService.getInstance();
    const stream = new Readable();
    stream.setEncoding('utf-8');
    stream.push(content);
    stream.push(null);
    await oss.putStream(fileName, stream);
    return true
  }

  async saveFile(fileName: string, filePath: string) {
    const oss = OSSService.getInstance();
    try {
      await oss.put(fileName, filePath);
      return true
    } catch (error) {
      console.error(error)
      return false;
    }
  }
}