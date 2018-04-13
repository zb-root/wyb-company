import mongoose from 'mongoose'

let Schema = mongoose.Schema

// 企业化学品
let schemaDefine = {
  company: {type: Schema.Types.ObjectId, ref: 'company'}, // 企业
  code: {type: String}, // 化学品代码
  name: {type: String}, // 化学品名
  operationModes: [String], // 经营方式(生产, 使用, 销售, 仓储, 运输, 处置)
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
