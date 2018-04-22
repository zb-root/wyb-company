import mongoose from 'mongoose'

let Schema = mongoose.Schema

// 企业易爆品追踪记录
let schemaDefine = {
  _id: {type: String}, // 唯一序列
  code: {type: String}, // 业务流水号
  signMark: {type: String, ref: 'signMark'}, // 标识编码
  company: {type: String, ref: 'company'}, // 法人和其他组织统一社会信用代码+省号
  storage: {type: String, ref: 'storage'}, // 储存场所+省号
  chemicalCode: {type: String}, // 化学品代码
  chemicalName: {type: String}, // 化学品名
  nick: {type: String}, // 化学品别称
  unit: {type: String}, // 化学品计量单位类型
  amount: {type: Number}, // 数值
  lossAmount: {type: Number}, // 损耗_数值
  registrant: {type: String}, // 登记人
  regtime: {type: Date}, // 登记时间
  companyCode: {type: String}, // 归属单位代码
  companyName: {type: String}, // 归属单位名称
  crtime: {type: Date}, // 日期时间
  memo: {type: String}, // 备注
  type: {type: Number}, // 记录类型(1:生产,2:销售,3:购买,4:使用,5:处置,6:转让,7:丢失被盗)
  ext: Schema.Types.Mixed // 不同记录类型有不同扩展结构
}

export default function (schema) {
  schema || (schema = new Schema())
  schema.add(schemaDefine)
  return schema
}

/**
 * ext扩展不同类型定义
 * 1.生产:{}
 * 2.销售:{
 * company: {type: String, ref: 'company'}, // 购买单位_法人和其他组织统一社会信用代码
 * address: {type: String}, // 地址
 * name: {type: String}, // 购买人姓名
 * identity: {type: String}, // 购买人身份证件类型
 * idNumber: {type: String}, // 购买人证件号码
 * telephone: {type: String}, // 购买人移动电话
 * JYZZCode: {type: String}, // 易制爆危险化学品经营资质证明分类代码
 * JYZZNumber: {type: String}, // 易制爆危险化学品经营资质证明编号
 * }
 * 3.购买:{
 * company: {type: String, ref: 'company'}, // 销售单位_法人和其他组织统一社会信用代码
 * address: {type: String}, // 地址
 * name: {type: String}, // 销售人姓名
 * identity: {type: String}, // 销售人身份证件类型
 * idNumber: {type: String}, // 销售人证件号码
 * telephone: {type: String}, // 销售人移动电话
 * JYZZCode: {type: String}, // 易制爆危险化学品经营资质证明分类代码
 * JYZZNumber: {type: String}, // 易制爆危险化学品经营资质证明编号
 * }
 * 4.使用:{}
 * 5.处置:{}
 * 6.转让:{
 * company: {type: String, ref: 'company'}, // 接收单位_法人和其他组织统一社会信用代码
 * storage: {type: String, ref: 'storage'}, // 接收单位储存场所编码
 * }
 * 5.丢失被盗:{
 *  DSBD: {type: Boolean} // 丢失/被盗_判断标识
 * }
 */
