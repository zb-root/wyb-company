import mongoose from 'mongoose'

let Schema = mongoose.Schema

// 企业储存场所货物信息
let schemaDefine = {
  storage: {type: Schema.Types.ObjectId, ref: 'storage'}, // 储存场所
  code: {type: String}, // 化学品代码
  name: {type: String}, // 化学品名
  unit: {type: String}, // 化学品计量单位类型
  amount: {type: Number}, // 数值
  stock: {type: Number}, // 库存量
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
