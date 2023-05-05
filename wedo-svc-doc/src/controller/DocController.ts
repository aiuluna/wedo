import { Request, Response } from "express";
import Application from "../Application";
import DocService from "../service/DocService";

enum HTTPMethod {
  GET,
  POST,
  PUT,
  DELETE
}

class DocController {
  
  @restful(HTTPMethod.PUT, '/code-project/:user/:name')
  async saveCodeProjectJSON(req: Request, res: Response) {
    console.log('req', req, req.params)
    const {user, name} = req.params;
    const values = req.body;
    const service = new DocService();
    const response = await service.saveCodeProject(user, name, values)
    res.send(response)
  }
}

function restful(method: HTTPMethod, path: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const application = Application.getInstance();
    const app = application.getApp();
    switch(method) {
      case HTTPMethod.GET:
        app.get(path, descriptor.value.bind(target)) 
        break
      case HTTPMethod.PUT:
        app.put(path, descriptor.value.bind(target))
    }
  }
}

export default DocController;