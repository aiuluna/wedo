import { Request, Response, Express } from 'express'
import { Application } from '../Application';
import { UploadService } from '../service/UploadService';

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
    res.send('hello')
  }

  @restful(HTTPMethod.POST, '/upload-content')
  async uploadContent(req: Request, res: Response) {
    const {file , content} = req.query as {[key: string]: any};
    const service = new UploadService()
    const data = await service.uploadContent(file, content);
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
