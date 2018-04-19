'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (service) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var logger = service.getLogger('main', __filename);

  var workbook = void 0;
  var dict = {};
  var p = _path2.default.join(__dirname, '../../config/dict.xlsx');
  try {
    workbook = _xlsx2.default.readFile(p); // 打开文件
  } catch (e) {
    logger.warn('no such file or directory, open ' + p);
    return dict;
  }

  var sheetNames = workbook.SheetNames; // 获取标签页数组
  var worksheet = workbook.Sheets[sheetNames[0]];
  var rows = _xlsx2.default.utils.sheet_to_json(worksheet, { range: 1 });
  rows.forEach(function (item) {
    dict[item.type] || (dict[item.type] = []);
    var ary = dict[item.type];
    ary.push({ code: item.code, name: item.name });
  });

  return dict;
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _xlsx = require('xlsx');

var _xlsx2 = _interopRequireDefault(_xlsx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];