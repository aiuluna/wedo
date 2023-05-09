import config from "../config";
import { CustomResponse, fetchStandrd } from "../standard";
import * as md5 from 'md5'

export class FileService {
  async post1(
    bucket: string,
    ext: string,
    content: string
  ): Promise<CustomResponse> {
    const hash = (md5 as any)(content);
    const finalFileName = ext ? `${bucket}/${hash}.${ext}` : `${bucket}/${hash}`;
    const res = await fetchStandrd(config.uploadFileText, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        content,
        file: finalFileName
      })
    })
    return res;
  }

  async get(url: string): Promise<CustomResponse> {
    let resp:any = null;
    try {
      resp = await fetch(url);
      const text = await resp.text();
      return {
        data: text, 
        success: true,
        httpCode: resp.status
      }
    } catch (error: any) {
      return {
        message: error.toString(),
        success: false,
        httpCode: resp ? resp.status : 400
      }
    }
  }
}