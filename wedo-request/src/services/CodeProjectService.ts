import config from "../config";
import { fetchStandrd } from "../standard";

export class CodeProjectService {
  public async put(user: string, name: string, values: any) {
    return await fetchStandrd(config.codeProjectURL(user, name), {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(values)
    })
  }
}