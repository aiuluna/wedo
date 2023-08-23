import { Request, Response, Express } from 'express'
import { Application } from '../Application';
import { UploadService } from '../service/UploadService';
import formidable from 'formidable'
import CryptoJS, { SHA1 } from 'crypto-js'
import fs from 'fs'

enum HTTPMethod {
  GET,
  POST,
  PUT,
  DELETE
}
export class UploadController {
  constructor() {
  }

  @restful(HTTPMethod.GET, '/')
  index(req: Request, res: Response) {
    res.send('hello wedo-svc-upload')
  }

  @restful(HTTPMethod.POST, '/upload-content')
  async uploadContent(req: Request, res: Response) {
    const { file, content } = req.body;
    const service = new UploadService()
    const data = await service.uploadContent(file, content);
    res.send(data)
  }

  @restful(HTTPMethod.POST, '/upload-object')
  async uploadFile(req: Request, res: Response){
    try {
      const form = new formidable.IncomingForm()
      form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).send({
          success: false,
          data: '上传失败'
        })
        const file = files.file;
        const service = new UploadService()
        const upFile = isSingleFile(file) ? file : file[0];
        const sha1sum = SHA1(fs.readFileSync(upFile.filepath, 'utf-8')).toString(CryptoJS.enc.Hex)
        const ext = upFile.mimetype.split('/').pop()
        const filename = `/img/${sha1sum}.${ext}`;
        const data = await service.uploadFile(filename, upFile)
        res.send(data)
      })
    } catch (error) {
      res.send({
        success: false,
        message: error
      })
    }


  }

}


function restful(method: HTTPMethod, path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    const application = Application.getInstance();
    const app = application.getApp()
    switch (method) {
      case HTTPMethod.GET:
        app.get(path, descriptor.value.bind(target))
        break;
      case HTTPMethod.POST:
        app.post(path, descriptor.value.bind(target))
        break;
      case HTTPMethod.PUT:
        app.put(path, descriptor.value.bind(target))
        break;
      default:
        break;
    }
  }
}


function isSingleFile(file: formidable.File | formidable.File[]): file is formidable.File {
  return !Array.isArray(file)
}
