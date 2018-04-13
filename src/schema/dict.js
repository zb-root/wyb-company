import mongoose from 'mongoose'

let Schema = mongoose.Schema

// 字典表
let schemaDefine = {
  type: {type: String, index: true}, // 类型
  code: {type: String, index: true}, // 编码
  name: {type: String}, // 名称
  value: {type: String}, // 值
  memo: {type: String}, // 备注
  status: {type: Number, default: 1} // 状态
}

export default function (schema) {
  schema || (schema = new Schema())
  schema.add(schemaDefine)
  schema.index({type: 1, code: 1}, {unique: true})
  return schema
}
