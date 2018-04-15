import mongoose from 'mongoose'

let Schema = mongoose.Schema

// 企业运输车辆备案信息
let schemaDefine = {
  _id: {type: String}, // 业务流水号
  company: {type: String, ref: 'company'}, // 企业
  idNumber: {type: String}, // 机动车号牌号码
  color: {type: String}, // 机动车号牌颜色代码
  sign: {type: String}, // 车辆识别代号
  engineNum: {type: String}, // 机动车发动机（电动机）号
  drivingExpire: {type: Date}, // 机动车行驶证有效期截止日期
  licenseNum: {type: String}, // 道路运输经营许可证编号
  licenseExpire: {type: String}, // 道路运输经营许可证_有效期截止日期
  CLJKSB: {type: Boolean, default: false}, // 是否有车载监控设备
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
