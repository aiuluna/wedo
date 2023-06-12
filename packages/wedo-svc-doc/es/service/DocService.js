"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CodeProject_1 = require("../models/CodeProject");
const Page_1 = require("../models/Page");
class DocService {
    saveCodeProject(user, name, values) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = { 'owner.name': user, name };
                const options = { new: true, upsert: true };
                const newData = {
                    type: values.type,
                    version: values.version,
                    scriptUrl: values.scriptUrl,
                    fileTreeNode: values.fileTreeNode,
                };
                const result = yield CodeProject_1.CodeProject.findOneAndUpdate(filter, newData, options).select('-owner');
                // const client = Redis.getInstance();
                // let userData = await client.getData(user);
                // const json = userData ? JSON.parse(userData) : {};
                // json[name] = values;
                // userData = JSON.stringify(json)
                // console.log('user', user, 'userData', userData)
                // await client.setData(user, userData)
                console.log('success save codeProject: ' + result);
                return {
                    success: true,
                    data: '上传成功'
                };
            }
            catch (error) {
                throw new Error('save code project error:' + error);
            }
        });
    }
    getCodeProject(user, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const db = MongoClient.getInstance().getClient();
                // const dbo = db.db(mongoConfig.dbName);
                const result = yield CodeProject_1.CodeProject.find({ 'owner.name': user, name });
                if (result && result.length === 1) {
                    return {
                        success: true,
                        data: result[0] || null
                    };
                }
                else {
                    return {
                        success: false,
                        message: 'data is error'
                    };
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
            }
            catch (error) {
                throw new Error('get code project error:' + error);
            }
        });
    }
    savePage(user, name, url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = { 'owner.name': user, name };
                const options = { new: true, upsert: true };
                const newData = {
                    url
                };
                const result = yield Page_1.Page.findOneAndUpdate(filter, newData, options).select('-owner -name');
                console.log('success save Page: ' + result);
                return {
                    success: true,
                    data: '上传成功'
                };
            }
            catch (error) {
                throw new Error('save page error:' + error);
            }
        });
    }
    getPage(user, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Page_1.Page.find({ 'owner.name': user, name });
                if (result && result.length === 1) {
                    return {
                        success: true,
                        data: result[0] || null
                    };
                }
                else {
                    return {
                        success: false,
                        message: 'data is error'
                    };
                }
            }
            catch (error) {
                throw new Error('get page error:' + error);
            }
        });
    }
}
exports.default = DocService;
