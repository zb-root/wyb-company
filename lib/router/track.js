'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (service) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var t = service.t;
  var Err = service.Err;
  var logger = service.getLogger('main', __filename);

  var defList = {
    conditions: {},
    options: {
      sort: [{ 'crtime': 1 }]
    },
    fields: { signMark: 1, company: 1, storage: 1, type: 1, regtime: 1, unit: 1, amount: 1, crtime: 1 },
    populations: [{ path: 'company', select: 'code name -_id' }]
  };
  var defGet = {
    conditions: {},
    fields: {
      signMark: 1,
      company: 1,
      storage: 1,
      type: 1,
      regtime: 1,
      unit: 1,
      amount: 1,
      crtime: 1
    },
    populations: null // 没有的话一定要是不传或者null,如果是{}则查不到数据
  };

  var listOpts = opts.list || defList;
  var getOpts = opts.get || defGet;

  var self = service.track;
  var router = ms.router();
  service.onReady().then(function () {
    router.use((0, _jmMsDaorouter2.default)(self, {
      list: listOpts,
      get: getOpts
    }));
    var routes = self.routes;

    /**
     * @api {get} /tracks 获取追踪记录列表
     * @apiVersion 0.0.1
     * @apiGroup company
     * @apiUse Error
     *
     * @apiParam {Number} [page=1] 第几页(可选).
     * @apiParam {Number} [rows=20] 一页几行(可选,默认20).
     * @apiParam {Object} [fields] 筛选字段(可选)
     * @apiParam {Object} [sort] 对查询数据排序(可选).
     * @apiParam {String} [signCode] 标识编码(可选).
     * @apiParam {String} [types] 经营方式查询(可选).
     * @apiParam {String} [province] 省(可选).
     * @apiParam {String} [city] 市(可选).
     * @apiParam {String} [startDate] 开始时间(可选).
     * @apiParam {String} [endDate] 结束时间(可选).
     * @apiParam {String} [utcOffset] 时区偏移(可选).
     *
     * @apiParamExample {json} 请求参数例子:
     * {
     *  page: 1,
     *  rows: 10,
     *  fields: {status:1}
     * }
     *
     * @apiSuccessExample {json} 成功:
     * {
     *  page:1,
     *  pages:2,
     *  total:10,
     *  rows:[{}]
     * }
     */
    routes.before_list = function (opts, cb, next) {
      var data = opts.data || {};
      logger.debug(opts.originalUri + ' request params:' + JSON.stringify(data));
      var lng = data.lng;
      if (data.page === undefined) data.page = 1;
      if (data.rows === undefined) data.rows = 20;
      var utcOffset = data.utcOffset;
      var startDate = data.startDate;
      var endDate = data.endDate;
      var fields = data.fields;
      var sort = data.sort;
      var signCode = data.signCode;
      var types = data.types;
      var province = data.province;
      var city = data.city;

      opts.conditions || (opts.conditions = {});
      var conditions = opts.conditions;
      if (startDate) {
        if (isNaN(Date.parse(startDate))) {
          return cb(null, t(Err.FA_PARAMS_FAIL, lng, { params: 'startDate' }));
        }
        startDate = new Date(startDate);
        conditions.crtime = conditions.crtime || {};
        conditions.crtime['$gte'] = startDate;
      }
      if (endDate) {
        if (isNaN(Date.parse(endDate))) {
          return cb(null, t(Err.FA_PARAMS_FAIL, lng, { params: 'endDate' }));
        }
        endDate = new Date(endDate);
        conditions.crtime = conditions.crtime || {};
        conditions.crtime['$lte'] = endDate;
      }
      if (province) {
        var code = province;
        if (city) {
          code += city;
        }
        conditions.companyCode = { $regex: '^' + code + '.*?' };
      }

      if (signCode) {
        conditions.signMark = signCode;
      }

      if (types) {
        types = Array.isArray(types) ? types : types.toString().split(',');
        conditions.type = { $in: types };
      }

      if (fields) {
        if (typeof fields === 'string') {
          try {
            fields = JSON.parse(fields);
          } catch (e) {
            fields = null;
          }
        }
        if (!_lodash2.default.isPlainObject(fields)) {
          return cb(null, t(Err.FA_PARAMS_FAIL, lng, { params: 'fields' }));
        }
        opts.fields = fields;
      }

      if (sort) {
        if (typeof sort === 'string') {
          try {
            sort = JSON.parse(sort);
          } catch (e) {
            sort = null;
          }
        }
        if (!_lodash2.default.isPlainObject(sort)) {
          return cb(null, t(Err.FA_PARAMS_FAIL, lng, { params: 'sort' }));
        }
        opts.options = { sort: sort };
      }

      next();
    };

    /**
     * @api {get} /tracks/:id 获取某条追踪记录
     * @apiVersion 0.0.1
     * @apiGroup company
     * @apiUse Error
     *
     * @apiParam {Object} [fields] 筛选字段(可选)
     *
     * @apiParamExample {json} 请求参数例子:
     * {
     *  fields: {status:1}
     * }
     *
     * @apiSuccessExample {json} 成功:
     * {
     * }
     */
    routes.before_get = function (opts, cb, next) {
      var data = opts.data || {};
      var lng = data.lng;
      var fields = data.fields;
      if (fields) {
        if (typeof fields === 'string') {
          try {
            fields = JSON.parse(fields);
          } catch (e) {
            fields = null;
          }
        }
        if (!_lodash2.default.isPlainObject(fields)) {
          return cb(null, t(Err.FA_PARAMS_FAIL, lng, { params: 'fields' }));
        }
        opts.fields = fields;
      }
      next();
    };
  });
  return router;
};

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _jmMsDaorouter = require('jm-ms-daorouter');

var _jmMsDaorouter2 = _interopRequireDefault(_jmMsDaorouter);

var _jmMsCore = require('jm-ms-core');

var _jmMsCore2 = _interopRequireDefault(_jmMsCore);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ms = new _jmMsCore2.default();
var ObjectId = _mongoose2.default.Types.ObjectId;

module.exports = exports['default'];