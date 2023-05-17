import { UploadDao } from "../dao/UploadDao";
import { ServiceResponseForOSS } from "../standard.types";
import formidable from 'formidable'

export class UploadService {
  private dao: UploadDao;
  constructor() {
    this.dao = new UploadDao()
  }

  async uploadContent(file: string, content: string): Promise<ServiceResponseForOSS> {
    const uploaded = await this.dao.saveFileByStream(file, content);
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

  async uploadFile(filename: string, file: formidable.File) {
    const ext = file.mimetype.split('/').pop()
    filename = `/img/${filename}.${ext}`;
    const uploaded = await this.dao.saveFile(filename, file.filepath)
    if (!uploaded) {
      return {
        success: false,
        data: '上传失败'
      }
    }
    if (filename[0] !== '/') {
      filename = '/' + filename;
    }
    return {
      success: true,
      data: `https://huzhang-wedo.oss-cn-hangzhou.aliyuncs.com${filename}`
    }
  }
}

