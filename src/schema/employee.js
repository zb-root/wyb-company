import mongoose from 'mongoose'

let Schema = mongoose.Schema

// 企业从业人员信息
let schemaDefine = {
  company: {type: Schema.Types.ObjectId, ref: 'company'}, // 企业
  code: {type: String}, // 业务流水号
  identity: {type: String}, // 身份证件类型
  idNumber: {type: String}, // 证件号
  type: {type: String}, // 从业人员类型
  education: {type: String}, // 学历代码
  nation: {type: String}, // 民族代码
  areaCode: {type: String}, // 籍贯国家/地区代码
  regAddress: {type: String}, // 户籍地址
  address: {type: String}, // 现住地址
  telephone: {type: String}, // 联系电话
  image: {type: String}, // 相片
  name: {type: String}, // 姓名
  gender: {type: String}, // 性别
  birthday: {type: Date}, // 生日
  isCancel: {type: Boolean, default: false}, // 是否已注销
  crtime: {type: Date, default: Date.now}, // 登记时间
  moditime: {type: Date} // 更新时间
}

export default function (schema) {
  schema || (schema = new Schema())
  schema.add(schemaDefine)
  return schema
}
