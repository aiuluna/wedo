import config from "../config";
import { CustomResponse, fetchStandrd } from "../standard";

export class CodeProjectService {
  public async put(user: string, name: string, values: any): Promise<CustomResponse> {
    return await fetchStandrd(config.codeProjectURL(user, name), {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(values)
    })
  }

  public async get(user: string, name: string): Promise<CustomResponse> {
    return await fetchStandrd(config.codeProjectURL(user, name), {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
  }

  build = new BuildService()

}

class BuildService {
  async put(user: string, name: string): Promise<CustomResponse> {
    const resp = await fetchStandrd(config.codeProjectBuildURL(user, name), {
      method: 'PUT'
    })
    return resp;
  }
}