import mongoose from "mongoose";
import { MongoClient } from "../MongoClient";
import Redis from "../RedisClient";
import { CodeProject } from "../models/CodeProject";
import mongoConfig from "../mongoConfig";
import { Page } from "../models/Page";

class DocService {
  public async saveCodeProject(user: string, name: string, values: any) {
    try {
      const filter = { 'owner.name': user, name }
      const options = { new: true, upsert: true };
      const newData = {

        type: values.type,
        version: values.version,
        scriptUrl: values.scriptUrl,
        fileTreeNode: values.fileTreeNode,
      }
      const result = await CodeProject.findOneAndUpdate(filter, newData, options).select('-owner')

      // const client = Redis.getInstance();
      // let userData = await client.getData(user);

      // const json = userData ? JSON.parse(userData) : {};
      // json[name] = values;
      // userData = JSON.stringify(json)

      // console.log('user', user, 'userData', userData)
      // await client.setData(user, userData)
      console.log('success save codeProject: ' + result)
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
      // const db = MongoClient.getInstance().getClient();
      // const dbo = db.db(mongoConfig.dbName);
      const result = await CodeProject.find({ 'owner.name': user, name })
      if (result && result.length === 1) {
        return {
          success: true,
          data: result[0] || null
        }
      } else {
        return {
          success: false,
          message: 'data is error'
        }
      }

      // const client = Redis.getInstance();
      // let userData = await client.getData(user)
      // if (result) {
      //   const res = JSON.parse(userData)[name]
      //   return {
      //     success: true,
      //     data: res || null
      //   }
      // }
    } catch (error) {
      throw new Error('get code project error:' + error)
    }
  }

  public async savePage(user: string, name: string, url: string) {
    try {
      const filter = { 'owner.name': user, name }
      const options = { new: true, upsert: true };
      const newData = {        
        url
      }
      const result = await Page.findOneAndUpdate(filter, newData, options).select('-owner -name')

      console.log('success save Page: ' + result)
      return {
        success: true,
        data: '上传成功'
      }
    } catch (error) {
      throw new Error('save page error:' + error)

    }
  }

  public async getPage(user: string, name: string) {
    try {
      const result = await Page.find({ 'owner.name': user, name })
      if (result && result.length === 1) {
        return {
          success: true,
          data: result[0] || null
        }
      } else {
        return {
          success: false,
          message: 'data is error'
        }
      }

    } catch (error) {
      throw new Error('get page error:' + error)
    }
  }
}

export default DocService;