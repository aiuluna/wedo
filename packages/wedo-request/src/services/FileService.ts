import config from "../config";
import { CustomResponse, fetchStandrd } from "../standard";
import { MD5 } from 'crypto-js'

export class FileService {
  async post1(
    bucket: string,
    ext: string,
    content: string
  ): Promise<CustomResponse> {
    const hash: string = MD5(content).toString();
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

  async post2(object: any): Promise<CustomResponse> {
    const form = new FormData();
    form.append("file", object);
    return await fetchStandrd(config.uploadFileObject, {
      method: 'POST',
      body: form
    })
  }

  async get(url: string): Promise<CustomResponse> {
    let resp: any = null;
    try {
      resp = await fetch(url);
      const text = await resp.text();
      return {
        data: text,
        success: true,
        httpCode: resp.status
      }
    } catch (error) {
      return {
        message: (error as Error).toString(),
        success: false,
        httpCode: resp ? resp.status : 400
      }
    }
  }
}