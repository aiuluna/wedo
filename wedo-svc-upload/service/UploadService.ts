import { UploadDao } from "../dao/UploadDao";
import { ServiceResponseForOSS } from "../standard.types";

export class UploadService {
  private dao;
  constructor() {
    this.dao = new UploadDao()
  }

  async uploadContent(file: string, content: string): Promise<ServiceResponseForOSS> {
    const uploaded = await this.dao(file, content);
    if (!uploaded) {
      return {
        success: false,
        data: ''
      }
    }
    return {
      success: true,
      data: ''
    }

  }

}

