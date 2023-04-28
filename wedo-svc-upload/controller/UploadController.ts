import { Request, Response, Express } from 'express'
import { Application } from '../Application';
import { UploadService } from '../service/uploadService';

enum HTTPMethod {
  GET,
  POST,
  PUT,
  DELETE
}
export class UploadController {
  private service: UploadService;
  constructor() {
    this.service = new UploadService()
  }

  @restful(HTTPMethod.GET, '/')
  index(req: Request, res: Response) {
    res.send('hello')
  }

  @restful(HTTPMethod.PUT, 'upload-content')
  async uploadContent(req: Request, res: Response) {
    const {file, content} = req.body;
    const data = await this.service.uploadContent(file, content);
    res.send(data)
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
