let mongoose = require('mongoose')

let Schema = mongoose.Schema

// 企业信息
let schemaDefine = {
  _id: {type: String}, // 法人和其他组织统一社会信用代码+省代号
  code: {type: String}, // 法人和其他组织统一社会信用代码
  organCode: {type: String}, // 公安机关机构代码
  companyCode: {type: String}, // 归属单位代码
  linkCode: {type: String}, // 易制爆危险化学品涉及环节代码
  name: {type: String}, // 企业名称
  legalName: {type: String}, // 法定代表人
  telephone: {type: String}, // 固定电话
  address: {type: String}, // 地址详情
  longitude: {type: Number}, // 地球经度
  latitude: {type: Number}, // 地球纬度
  dutyPoliceName: {type: String}, // 责任民警姓名
  guardName: {type: String}, // 保卫负责人
  guardSum: {type: Number}, // 安全管理人数
  storagePlaceSum: {type: Number}, // 储存场所数量
  storageUnit: {type: String}, // 储存场所单位
  storageCapacity: {type: Number}, // 储存场所容量
  monitoringSum: {type: Number}, // 视频监控设备数量
  operationModes: [String], // 经营方式(生产, 经营, 储存, 使用)
  chemicals: [String], // 化学品
  isCancel: {type: Boolean, default: false}, // 是否已注销
  BJZZ: {type: Boolean, default: false}, // 是否有报警装置
  YYZZ: {type: Boolean, default: false}, // 是否有营业执照
  WXHXPAQSCXKZ: {type: Boolean, default: false}, // 是否有危险化学品安全生产许可证
  WXHXPJYXKZ: {type: Boolean, default: false}, // 是否有危险化学品经营许可证
  WXHXPAQSYXKZ: {type: Boolean, default: false}, // 是否有危险化学品安全使用许可证
  WXHXPAQPJBG: {type: Boolean, default: false}, // 是否有危险化学品安全评价报告
  authState: {type: Number, default: 0}, // 认证状态(0:未认证,1:已认证)
  crtime: {type: Date, default: Date.now}, // 登记时间
  moditime: {type: Date} // 更新时间
}

module.exports = function (schema) {
  schema || (schema = new Schema())
  schema.add(schemaDefine)
  return schema
}
