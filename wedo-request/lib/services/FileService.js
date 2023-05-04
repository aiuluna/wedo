import config from "../config";
import { fetchStandrd } from "../standard";
import md5 from 'md5';
export class FileService {
    async post1(bucket, ext, content) {
        const hash = md5(content);
        const finalFileName = ext ? `${bucket}/${hash}.${ext}` : `${bucket}/${hash}`;
        const res = await fetchStandrd(config.uploadFileText, {
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                content,
                file: finalFileName
            })
        });
        return res;
    }
}
