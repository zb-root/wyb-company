import mongoose from 'mongoose'

let Schema = mongoose.Schema

let schemaDefine = {
  name: {type: String} // 企业名称
}

export default function (schema) {
  schema || (schema = new Schema())
  schema.add(schemaDefine)
  return schema
};
