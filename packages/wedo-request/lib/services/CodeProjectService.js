import config from "../config";
import { fetchStandrd } from "../standard";
export class CodeProjectService {
    async put(user, name, values) {
        return await fetchStandrd(config.codeProjectURL(user, name), {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(values)
        });
    }
    async get(user, name) {
        return await fetchStandrd(config.codeProjectURL(user, name), {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        });
    }
}
