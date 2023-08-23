import mongoose, { Schema } from "mongoose"

const codeProjectSchema = new mongoose.Schema({
  name: String,
  type: String,
  version: Number,
  scriptUrl: {type: String, required: false},
  fileTreeNode: Schema.Types.Mixed,
  owner: {
    name: String
  }
})

export const CodeProject = mongoose.model('CodeProject', codeProjectSchema)