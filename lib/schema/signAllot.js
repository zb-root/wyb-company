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

// 企业易爆品标识分配
var schemaDefine = {
  _id: { type: String }, // 易制爆标识编码
  company: { type: String, ref: 'company' }, // 法人和其他组织统一社会信用代码
  signMark: { type: String, ref: 'signMark' }, // 原有_易制爆标识编码
  registrant: { type: String }, // 登记人
  regtime: { type: Date }, // 登记时间
  companyCode: { type: String }, // 归属单位代码
  companyName: { type: String }, // 归属单位名称
  crtime: { type: Date // 发生日期时间
  } };

module.exports = exports['default'];