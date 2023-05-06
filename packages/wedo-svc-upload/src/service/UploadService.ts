import { UploadDao } from "../dao/UploadDao";
import { ServiceResponseForOSS } from "../standard.types";

export class UploadService {
  private dao: UploadDao;
  constructor() {
    this.dao = new UploadDao()
  }

  async uploadContent(file: string, content: string): Promise<ServiceResponseForOSS> {
    const uploaded = await this.dao.saveFile(file, content);
    if (!uploaded) {
      return {
        success: false,
        data: '上传失败'
      }
    }
    if (file[0] !== '/') {
      file = '/' + file;
    }
    return {
      success: true,
      data: `https://huzhang-wedo.oss-cn-hangzhou.aliyuncs.com${file}`
    }

  }

}

