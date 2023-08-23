import config from "../config";
import { fetchStandrd } from "../standard";

export class PageService {
  public async put(user: string, name: string, url: string) {
    return await fetchStandrd(config.pageUrl(user, name), {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body : JSON.stringify({
        url
      })
    })
  }

  public async get(user: string, name: string) {
    return await fetchStandrd(config.pageUrl(user, name))
  }
}