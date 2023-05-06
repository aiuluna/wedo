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

  public async getCodeProject(user: string, name: string) {
    try {
      const client = Redis.getInstance();
      let userData = await client.getData(user)
      if (userData) {
        const res = JSON.parse(userData)[name]
        return {
          success: true,
          data: res || null
        }
      }
    } catch (error) {
      throw new Error('get code project error:' + error)
    }
  }
}

export default DocService;