let mongoose = require('mongoose')

let Schema = mongoose.Schema

// 企业储存场所货物信息
let schemaDefine = {
  _id: {type: String}, // 业务流水号
  storage: {type: String, ref: 'storage'}, // 储存场所
  code: {type: String}, // 化学品代码
  name: {type: String}, // 化学品名
  unit: {type: String}, // 化学品计量单位类型
  amount: {type: Number}, // 数值
  companyCode: {type: String}, // 归属单位代码
  companyName: {type: String}, // 归属单位名称
  crtime: {type: Date, default: Date.now}, // 登记时间
  moditime: {type: Date} // 更新时间
}

module.exports = function (schema) {
  schema || (schema = new Schema())
  schema.add(schemaDefine)
  return schema
}
