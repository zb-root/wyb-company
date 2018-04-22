'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var service = this;
  var router = ms.router();
  var t = service.t;
  var Err = service.Err;
  var logger = service.getLogger('main', __filename);

  this.onReady().then(function () {
    router.use((0, _help2.default)(service)).use('/infos', (0, _company2.default)(service)).use('/tracks', (0, _track2.default)(service)).add('/dict', 'get', function (opts, cb, next) {
      var data = opts.data;
      var type = data.type;
      var ret = {};
      if (type) {
        ret[type] = service.dict[type] || [];
      } else {
        ret = service.dict;
      }
      cb(null, ret);
    })
    /**
     * @api {get} /ranking 获取数据排行
     * @apiVersion 0.0.1
     * @apiGroup company
     * @apiUse Error
     *
     * @apiParam {Number} [type] 类别(可选, 1;企业数量,2:人员数量,3:库房数量,4:库存数量,5:车辆数量,6:标识数量,7:生产数量,8:销售数量,9:购买数量,10:使用数量).
     * @apiParam {String} [year] 年份(可选, 默认今年).
     * @apiParam {String} [province] 省(可选, 默认所有).
     * @apiParam {String} [utcOffset] 时区偏移(可选).
     *
     * @apiParamExample {json} 请求参数例子:
     * {
     *  type: 1,
     *  year: '2018'
     * }
     *
     * @apiSuccessExample {json} 成功:
     * {
     *  rows:[{"_id":{"date":"2018","province":"33"},"count":947}]
     * }
     */
    .add('/ranking', 'get', function (opts, cb, next) {
      var data = opts.data;
      var lng = data.lng;
      var year = data.year;
      var province = data.province;
      var type = data.type;
      var utcOffset = data.utcOffset || service.config.utcOffset;
      var UTC = Number(utcOffset || 0);
      var startDate = void 0;
      var endDate = void 0;
      if (year) {
        year += '-01';
        startDate = (0, _moment2.default)(year).utcOffset(-UTC).startOf('year').utcOffset(0);
        endDate = (0, _moment2.default)(year).utcOffset(-UTC).endOf('year').utcOffset(0);
      } else {
        startDate = (0, _moment2.default)().utcOffset(-UTC).startOf('year').utcOffset(0);
        endDate = (0, _moment2.default)().utcOffset(-UTC).endOf('year').utcOffset(0);
      }

      var model = {
        '1': service.company,
        '2': service.employee,
        '3': service.storage,
        '4': service.goods,
        '5': service.truck,
        '6': service.signMark,
        '7': service.track,
        '8': service.track,
        '9': service.track,
        '10': service.track
      };

      model = model[type];
      if (!model) {
        return cb(null, t(Err.FA_PARAMS_FAIL, lng, { params: 'type' }));
      }

      var conditions = { crtime: { $gte: startDate.toDate(), $lte: endDate.toDate() } };
      if (province) {
        conditions.companyCode = { $regex: '^' + province + '.*?' };
      }
      if (type == 7 || type == 8 || type == 9 || type == 10) {
        conditions.type = type - 6;
      }
      var q = model.aggregate();
      q.match(conditions);
      q.project({
        date: { $dateToString: { format: '%Y', date: { '$add': ['$crtime', -UTC * 60 * 1000] } } },
        province: { $substr: ['$companyCode', 0, 2] }
      });
      q.group({
        _id: { date: '$date', province: '$province' },
        count: { $sum: 1 }
      });
      q.sort({ count: -1 });
      q.exec(function (err, result) {
        if (err) {
          console.log(err);
          return cb(null, t(Err.FA_SYS, lng));
        }
        cb(null, { rows: result || [] });
      });
    })
    /**
     * @api {get} /signSearch 标识搜索
     * @apiVersion 0.0.1
     * @apiGroup company
     * @apiUse Error
     *
     * @apiParam {String} [search] 模糊查询标识.
     * @apiParam {Number} [rows=20] 一页几行(可选,默认20).
     *
     * @apiParamExample {json} 请求参数例子:
     * {
     * }
     *
     * @apiSuccessExample {json} 成功:
     * {
     *  rows:["010444032017112100000012","010444032017112100000029"]
     * }
     */
    .add('/signSearch', 'get', function (opts, cb, next) {
      var data = opts.data;
      var lng = data.lng;
      var search = data.search || '0';
      var rows = data.rows || 20;
      service.signMark.find2({
        conditions: { _id: { $regex: '.*?' + search + '.*?' } },
        fields: { _id: 1 },
        page: 1,
        rows: rows
      }, function (err, docs) {
        if (err) {
          console.log(err);
          return cb(null, t(Err.FA_SYS, lng));
        }
        var ret = _lodash2.default.map(docs.rows, '_id');
        cb(null, { rows: ret });
      });
    })
    /**
     * @api {get} /signInfo 获取标识信息
     * @apiVersion 0.0.1
     * @apiGroup company
     * @apiUse Error
     *
     * @apiParam {String} [id] 标识id.
     *
     * @apiParamExample {json} 请求参数例子:
     * {
     * }
     *
     * @apiSuccessExample {json} 成功:
     * {
     * }
     */
    .add('/signInfo', 'get', function (opts, cb, next) {
      var data = opts.data;
      var lng = data.lng;
      var id = data.id;
      var ret = void 0;
      _async2.default.waterfall([function (cb) {
        service.signMark.findById2(id, {
          fields: { company: 1, chemicalCode: 1, chemicalName: 1, unit: 1, amount: 1 },
          lean: true
        }, function (err, doc) {
          if (err) {
            console.log(err);
            return cb(t(Err.FA_SYS, lng));
          }
          if (!doc) return cb();
          ret = doc;
          ret.state = 0;
          cb();
        });
      }, function (cb) {
        // 查询生产信息
        if (!ret) return cb();
        service.track.findOne2({
          conditions: { signMark: ret._id, type: 1 },
          fields: { _id: 0, company: 1, crtime: 1 },
          populations: { path: 'company', select: 'code name -_id' }
        }, function (err, doc) {
          if (err) {
            console.log(err);
            return cb(t(Err.FA_SYS, lng));
          }
          if (!doc) return cb();
          ret.state = 1;
          ret.factoryInfo = doc;
          cb();
        });
      }, function (cb) {
        // 最后一次仓储信息
        if (!ret) return cb();
        service.track.findOne2({
          conditions: { signMark: ret._id },
          fields: { _id: 0, storage: 1, companyName: 1, unit: 1, amount: 1, type: 1 },
          populations: { path: 'storage', select: 'address -_id' },
          options: { sort: { crtime: -1 } }
        }, function (err, doc) {
          if (err) {
            console.log(err);
            return cb(t(Err.FA_SYS, lng));
          }
          if (!doc) return cb();
          ret.state = doc.type;
          ret.storageInfo = doc;
          cb();
        });
      }], function (err, result) {
        if (err) {
          return cb(null, err);
        }
        cb(null, ret || {});
      });
    });
  });

  return router;
};

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _jmMsCore = require('jm-ms-core');

var _jmMsCore2 = _interopRequireDefault(_jmMsCore);

var _help = require('./help');

var _help2 = _interopRequireDefault(_help);

var _company = require('./company');

var _company2 = _interopRequireDefault(_company);

var _track = require('./track');

var _track2 = _interopRequireDefault(_track);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ms = new _jmMsCore2.default();

module.exports = exports['default'];