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

// 企业储存场所货物信息
var schemaDefine = {
  storage: { type: String, ref: 'storage' }, // 储存场所
  chemical: { type: String, ref: 'chemical' }, // 化学品代码
  unit: { type: String }, // 化学品计量单位类型
  amount: { type: Number }, // 数值
  stock: { type: Number }, // 库存量
  companyCode: { type: String }, // 归属单位代码
  companyName: { type: String }, // 归属单位名称
  isCancel: { type: Boolean, default: false }, // 是否已注销
  crtime: { type: Date, default: Date.now }, // 登记时间
  moditime: { type: Date // 更新时间
  } };

module.exports = exports['default'];