import mongoose, { Schema } from "mongoose"

const pageSchema = new mongoose.Schema({
  owner: {
    name: String
  },
  name: String,
  url: String
})

export const Page = mongoose.model('Page', pageSchema) 