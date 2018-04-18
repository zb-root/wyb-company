import mongoose from 'mongoose'

let Schema = mongoose.Schema

// 企业化学品
let schemaDefine = {
  _id: {type: String}, // 业务流水号+省代号
  company: {type: String, ref: 'company'}, // 法人和其他组织统一社会信用代码
  code: {type: String}, // 化学品代码
  name: {type: String}, // 化学品名
  operationModes: [String], // 经营方式(生产, 经营, 储存, 使用)
  companyCode: {type: String}, // 归属单位代码
  companyName: {type: String}, // 归属单位名称
  isCancel: {type: Boolean, default: false}, // 是否已注销
  crtime: {type: Date, default: Date.now}, // 登记时间
  moditime: {type: Date} // 更新时间
}

export default function (schema) {
  schema || (schema = new Schema())
  schema.add(schemaDefine)
  return schema
}
