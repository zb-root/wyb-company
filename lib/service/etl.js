'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (service) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var logger = service.getLogger('main', __filename);

  var etl = {
    syncTime: _sync2.default,
    companyImport: function companyImport() {
      logger.info('company sync data start');
      var fileName = '050701';
      var p = _path2.default.join(__dirname, '../../data/' + fileName + '.xlsx');
      var workbook = _xlsx2.default.readFile(p); // 打开文件
      var sheetNames = workbook.SheetNames; // 获取标签页数组
      var worksheet = workbook.Sheets[sheetNames[0]];
      var rows = _xlsx2.default.utils.sheet_to_json(worksheet, {});
      var map = _mapping2.default[fileName];
      var syncTime = etl.syncTime[fileName] || 0;

      var progress = 0;
      var totle = rows.length;
      var tt = void 0;
      function printProgress() {
        if (progress >= totle) return;
        tt = setTimeout(function () {
          logger.info('company sync data progress (%s / %s  %s%)', progress, totle, Math.floor(progress / totle * 100));
          printProgress();
        }, 60 * 1000);
      }
      printProgress();

      _async2.default.eachSeries(rows, function (doc, callback) {
        progress++;
        var data = {};
        for (var k in doc) {
          var key = map[k];
          key && (data[key] = doc[k]);
        }
        if (data.moditime) {
          var updateTime = new Date(data.moditime);
          if (updateTime.getTime() < syncTime) {
            setTimeout(function () {
              callback();
            }, 10);
            return;
          }
        }

        data.authState = Number(data.YYZZ) || Number(data.WXHXPAQSCXKZ) || Number(data.WXHXPJYXKZ) || Number(data.WXHXPAQSYXKZ) || Number(data.WXHXPAQPJBG);
        service.company.update({ _id: data._id }, data, { upsert: true }, function (err, doc) {
          err && console.log(err);
          err && logger.warn('company未同步数据: ' + JSON.stringify(data));
          callback();
        });
      }, function (err) {
        tt && clearTimeout(tt);
        logger.info('company data Import %s completion', rows.length);

        // 记录同步时间
        service.company.findOne({}, { moditime: 1 }, { sort: { moditime: -1 } }, function (err, doc) {
          if (doc && doc.moditime) {
            var d = new Date(doc.moditime);
            etl.syncTime[fileName] = d.getTime();
            _fsExtra2.default.writeJsonSync(_path2.default.join(__dirname, '../../config/sync.json'), etl.syncTime);
          }
        });
      });
    },
    chemicalImport: function chemicalImport() {
      logger.info('chemical sync data start');
      var fileName = '050702';
      var p = _path2.default.join(__dirname, '../../data/' + fileName + '.xlsx');
      var workbook = _xlsx2.default.readFile(p); // 打开文件
      var sheetNames = workbook.SheetNames; // 获取标签页数组
      var worksheet = workbook.Sheets[sheetNames[0]];
      var rows = _xlsx2.default.utils.sheet_to_json(worksheet, {});
      var map = _mapping2.default[fileName];
      var syncTime = etl.syncTime[fileName] || 0;

      var progress = 0;
      var totle = rows.length;
      var tt = void 0;
      function printProgress() {
        if (progress >= totle) return;
        tt = setTimeout(function () {
          logger.info('chemical sync data progress (%s / %s  %s%)', progress, totle, Math.floor(progress / totle * 100));
          printProgress();
        }, 60 * 1000);
      }
      printProgress();

      _async2.default.eachSeries(rows, function (doc, callback) {
        progress++;
        var data = {};
        for (var k in doc) {
          var key = map[k];
          if (key === 'operationModes') {
            data[key] || (data[key] = []);
            if (Number(doc[k])) {
              if (k === 'SFSJSC_PDBZ') data[key].push('生产');
              if (k === 'SFSJJY_PDBZ') data[key].push('经营');
              if (k === 'SFSJCC_PDBZ') data[key].push('储存');
              if (k === 'SFSJSY_PDBZ') data[key].push('使用');
            }
          } else {
            key && (data[key] = doc[k]);
          }
        }
        if (data.moditime) {
          var updateTime = new Date(data.moditime);
          if (updateTime.getTime() < syncTime) {
            setTimeout(function () {
              callback();
            }, 10);
            return;
          }
        }
        service.chemical.update({ _id: data._id }, data, { upsert: true }, function (err, doc) {
          err && console.log(err);
          err && logger.warn('chemical未同步数据: ' + JSON.stringify(data));
          service.company.update({ _id: data.company }, {
            $addToSet: {
              operationModes: { $each: data.operationModes },
              chemicals: { $each: [data.name] }
            }
          }, function (err, doc) {
            callback();
          });
        });
      }, function (err) {
        tt && clearTimeout(tt);
        logger.info('chemical data Import %s completion', rows.length);

        // 记录同步时间
        service.chemical.findOne({}, { moditime: 1 }, { sort: { moditime: -1 } }, function (err, doc) {
          if (doc && doc.moditime) {
            var d = new Date(doc.moditime);
            etl.syncTime[fileName] = d.getTime();
            _fsExtra2.default.writeJsonSync(_path2.default.join(__dirname, '../../config/sync.json'), etl.syncTime);
          }
        });
      });
    }

    // etl.companyImport()
    // etl.chemicalImport()

  };return etl;
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _xlsx = require('xlsx');

var _xlsx2 = _interopRequireDefault(_xlsx);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _mapping = require('./mapping');

var _mapping2 = _interopRequireDefault(_mapping);

var _sync = require('../../config/sync');

var _sync2 = _interopRequireDefault(_sync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];