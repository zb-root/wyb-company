'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (schema) {
  schema || (schema = new Schema());
  schema.add(schemaDefine);
  schema.index({ type: 1, code: 1 }, { unique: true });
  return schema;
};

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

// 字典表
var schemaDefine = {
  type: { type: String, index: true }, // 类型
  code: { type: String, index: true }, // 编码
  name: { type: String }, // 名称
  value: { type: String }, // 值
  memo: { type: String }, // 备注
  status: { type: Number, default: 1 // 状态
  } };

module.exports = exports['default'];