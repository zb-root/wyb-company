let mongoose = require('mongoose')

let Schema = mongoose.Schema

// 企业易爆品标识生成
let schemaDefine = {
  _id: {type: String}, // 标识编码
  company: {type: String, ref: 'company'}, // 法人和其他组织统一社会信用代码
  chemicalCode: {type: String}, // 化学品代码
  chemicalName: {type: String}, // 化学品名
  unit: {type: String}, // 化学品计量单位类型
  amount: {type: Number}, // 数值
  registrant: {type: String}, // 登记人
  regtime: {type: Date}, // 登记时间
  companyCode: {type: String}, // 归属单位代码
  companyName: {type: String}, // 归属单位名称
  crtime: {type: Date} // 生成时间
}

module.exports = function (schema) {
  schema || (schema = new Schema())
  schema.add(schemaDefine)
  return schema
}
