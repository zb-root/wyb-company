let mongoose = require('mongoose')

let Schema = mongoose.Schema

// 企业储存场所基本信息
let schemaDefine = {
  _id: {type: String}, // 场所编码+省代号
  company: {type: String, ref: 'company'}, // 企业
  building: {type: String}, // 建筑物名称
  district: {type: String}, // 行政区划名称
  address: {type: String}, // 地址名称
  longitude: {type: Number}, // 地球经度
  latitude: {type: Number}, // 地球纬度
  area: {type: Number}, // 面积（平方米）
  capacityUnit: {type: String}, // 计量单位类型
  capacity: {type: Number}, // 储存场所容量
  organCode: {type: String}, // 公安机关机构代码
  type: {type: String}, // 场所类型
  companyCode: {type: String}, // 归属单位代码
  companyName: {type: String}, // 归属单位名称
  FDMJB: {type: String}, // 防盗门级别(J Y B D)
  SPJKSB: {type: Boolean, default: false}, // 是否有视频监控设备
  FDM: {type: Boolean, default: false}, // 是否有防盗门
  XXCJSB: {type: Boolean, default: false}, // 是否有信息采集设备
  isCancel: {type: Boolean, default: false}, // 是否已注销
  crtime: {type: Date, default: Date.now}, // 登记时间
  moditime: {type: Date} // 更新时间
}

module.exports = function (schema) {
  schema || (schema = new Schema())
  schema.add(schemaDefine)
  return schema
}
