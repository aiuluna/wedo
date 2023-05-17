import mongoose, { Mongoose, Schema } from 'mongoose';
import mongoConfig from './mongoConfig';

export class MongoClient {

  static inst: MongoClient;
  private db: Mongoose;

  private constructor() {}

  async connect() {
    mongoose.connect(mongoConfig.url, {
      authSource: 'admin',
      auth: { username: mongoConfig.username, password: mongoConfig.password }
    }).then(() => {
      console.log(`Connected to ${mongoConfig.dbName} database`);
      this.db = mongoose;
    }).catch((error) => {
      console.log('Error connecting to database:', error.message);
    });
  }

  getClient() {
    return this.db;
  }

  static getInstance() {
    if (!MongoClient.inst) {
      MongoClient.inst = new MongoClient()
    }
    return MongoClient.inst;
  }
}