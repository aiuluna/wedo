import OSS from 'ali-oss';
import { Stream } from 'stream';
import config from './ossConfig';

class OSSService {
  private client: OSS;
  static Inst: OSSService;

  private constructor() {
    this.client = new OSS({
      ...config
    })
  }

  static getInstance() {
    if (!OSSService.Inst) {
      OSSService.Inst = new OSSService()
    }
    return OSSService.Inst
  }

  public async put(filename: string, filepath: string) {
    try {
      const result = await this.client.put(filename, filepath)
      return result
    } catch (error) {
      throw new Error(error)
    }
  }

  public async putStream(fileName: string, stream: Stream) {
    try {
      // console.log('filename', fileName)
      // console.log('stream', stream)
      const result = await this.client.putStream(fileName, stream);
      return result
    } catch (error) {
      throw new Error(error)
    }


  }
}

export default OSSService;
