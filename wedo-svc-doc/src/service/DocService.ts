import Redis from "../RedisClient";

class DocService {
  public async saveCodeProject(user: string, name: string, values: any) {
    try {
      const client = Redis.getInstance();
      let userData = await client.getData(user);

      const json = userData ? JSON.parse(userData) : {};
      json[name] = values;
      userData = JSON.stringify(json)

      console.log('user', user, 'userData', userData)
      await client.setData(user, userData)
      return {
        success: true,
        data: '上传成功'
      }
    } catch (error) {
      throw new Error('save code project error:' + error)
    }
  }
}

export default DocService;