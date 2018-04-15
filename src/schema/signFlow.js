import mongoose from 'mongoose'

let Schema = mongoose.Schema

// 企业易爆品标识流向
let schemaDefine = {
  company: {type: String, ref: 'company'}, // 当前所在单位_法人和其他组织统一社会信用代码
  signMark: {type: String, ref: 'signMark'}, // 标识编码
  linkCode: {type: String}, // 易制爆危险化学品涉及环节代码
  registrant: {type: String}, // 登记人
  regtime: {type: String}, // 登记时间
  companyCode: {type: String}, // 归属单位代码
  companyName: {type: String}, // 归属单位名称
  crtime: {type: Date} // 流向变更时间
}

export default function (schema) {
  schema || (schema = new Schema())
  schema.add(schemaDefine)
  return schema
}
