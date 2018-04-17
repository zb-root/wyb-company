import mongoose from 'mongoose'

let Schema = mongoose.Schema

// 企业易爆品标识生成
let schemaDefine = {
  _id: {type: String}, // 标识编码
  company: {type: String, ref: 'company'}, // 企业
  chemical: {type: String, ref: 'chemical'}, // 化学品代码
  unit: {type: String}, // 化学品计量单位类型
  amount: {type: Number}, // 数值
  registrant: {type: String}, // 登记人
  regtime: {type: Date}, // 登记时间
  companyCode: {type: String}, // 归属单位代码
  companyName: {type: String}, // 归属单位名称
  crtime: {type: Date} // 生成时间
}

export default function (schema) {
  schema || (schema = new Schema())
  schema.add(schemaDefine)
  return schema
}
