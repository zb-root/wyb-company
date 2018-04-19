'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (schema) {
  schema || (schema = new Schema());
  schema.add(schemaDefine);
  return schema;
};

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

// 企业从业人员信息
var schemaDefine = {
  _id: { type: String }, // 业务流水号
  company: { type: String, ref: 'company' }, // 企业
  identity: { type: String }, // 身份证件类型
  idNumber: { type: String }, // 证件号
  type: { type: String }, // 从业人员类型
  education: { type: String }, // 学历代码
  nation: { type: String }, // 民族代码
  areaCode: { type: String }, // 籍贯国家/地区代码
  regAddress: { type: String }, // 户籍地址
  address: { type: String }, // 现住地址
  telephone: { type: String }, // 联系电话
  image: { type: String }, // 相片
  name: { type: String }, // 姓名
  gender: { type: String }, // 性别
  birthday: { type: Date }, // 生日
  ZGZLX_MC: { type: String }, // 资格证类型_名称
  ZGZ_ZJHM: { type: String }, // 资格证证件号码
  ZGZ_YXQJZRQ: { type: Date }, // 资格证有效期截止日期
  ZGZBF_DWMC: { type: String }, // 资格证颁发单位名称
  ZGZBF_RQ: { type: Date }, // 资格证颁发日期
  companyCode: { type: String }, // 归属单位代码
  companyName: { type: String }, // 归属单位名称
  isCancel: { type: Boolean, default: false }, // 是否已注销
  crtime: { type: Date, default: Date.now }, // 登记时间
  moditime: { type: Date // 更新时间
  } };

module.exports = exports['default'];