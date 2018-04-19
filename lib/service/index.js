'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var o = {
    ready: false,
    config: opts,
    getLogger: _logger2.default,
    Err: Err,
    t: function t(doc, lng, tr) {
      if ((typeof lng === 'undefined' ? 'undefined' : _typeof(lng)) === 'object') {
        tr = lng;
        lng = null;
      }
      lng || (lng = opts.lng);
      if (doc && lng && doc.err && doc.msg) {
        doc = {
          err: doc.err,
          msg: (0, _locale2.default)(doc.msg, lng) || Err.t(doc.msg, lng) || doc.msg
        };
      }
      if (tr) {
        doc.msg = _jmErr2.default.errMsg(doc.msg, tr);
      }
      return doc;
    },
    fillZero: function fillZero(num, length) {
      if (isNaN(num)) return;
      num = '' + num;
      if (num.length > length) length = num.length;
      return (Array(length).join('0') + num).slice(-length);
    },
    onReady: function onReady() {
      var self = this;
      return new _bluebird2.default(function (resolve, reject) {
        if (self.ready) return resolve(self.ready);
        self.on('ready', function () {
          resolve();
        });
      });
    }
  };
  _jmEvent2.default.enableEvent(o);

  // 绑定api接口
  var bind = function bind(name, alias, uri) {
    uri === undefined && (uri = opts.gateway + '/' + name);
    ms.client({
      uri: uri
    }, function (err, doc) {
      !err && doc && (o[alias || name] = doc);
    });
  };
  bind('sso');
  bind('passport');
  bind('user');
  bind('acl');

  var cb = function cb(db) {
    opts.db = db;
    o.sq = _jmDao2.default.sequence({ db: db });
    o.company = (0, _company2.default)(o, opts);
    o.chemical = (0, _chemical2.default)(o, opts);
    o.employee = (0, _employee2.default)(o, opts);
    o.goods = (0, _goods2.default)(o, opts);
    o.signAllot = (0, _signAllot2.default)(o, opts);
    o.signFlow = (0, _signFlow2.default)(o, opts);
    o.signMark = (0, _signMark2.default)(o, opts);
    o.storage = (0, _storage2.default)(o, opts);
    o.track = (0, _track2.default)(o, opts);
    o.truck = (0, _truck2.default)(o, opts);

    o.dict = (0, _dict2.default)(o);
    (0, _etl2.default)(o);

    o.ready = true;
    o.emit('ready');
    logger.info('服务启动');
  };

  if (!opts.db) {
    opts.db = _jmDao2.default.db.connect().then(cb);
  } else if (typeof opts.db === 'string') {
    opts.db = _jmDao2.default.db.connect(opts.db).then(cb);
  }

  return o;
};

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _jmDao = require('jm-dao');

var _jmDao2 = _interopRequireDefault(_jmDao);

var _jmEvent = require('jm-event');

var _jmEvent2 = _interopRequireDefault(_jmEvent);

var _jmMs = require('jm-ms');

var _jmMs2 = _interopRequireDefault(_jmMs);

var _jmErr = require('jm-err');

var _jmErr2 = _interopRequireDefault(_jmErr);

var _locale = require('../locale');

var _locale2 = _interopRequireDefault(_locale);

var _consts = require('../consts');

var _consts2 = _interopRequireDefault(_consts);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _company = require('./model/company');

var _company2 = _interopRequireDefault(_company);

var _chemical = require('./model/chemical');

var _chemical2 = _interopRequireDefault(_chemical);

var _employee = require('./model/employee');

var _employee2 = _interopRequireDefault(_employee);

var _goods = require('./model/goods');

var _goods2 = _interopRequireDefault(_goods);

var _signAllot = require('./model/signAllot');

var _signAllot2 = _interopRequireDefault(_signAllot);

var _signFlow = require('./model/signFlow');

var _signFlow2 = _interopRequireDefault(_signFlow);

var _signMark = require('./model/signMark');

var _signMark2 = _interopRequireDefault(_signMark);

var _storage = require('./model/storage');

var _storage2 = _interopRequireDefault(_storage);

var _track = require('./model/track');

var _track2 = _interopRequireDefault(_track);

var _truck = require('./model/truck');

var _truck2 = _interopRequireDefault(_truck);

var _etl = require('./etl');

var _etl2 = _interopRequireDefault(_etl);

var _dict = require('./dict');

var _dict2 = _interopRequireDefault(_dict);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ms = (0, _jmMs2.default)();
var Err = _lodash2.default.defaults(_jmErr2.default.Err, _consts2.default.Err);
var logger = (0, _logger2.default)('main', __filename);

/**
 * game-server service
 * @param {Object} opts
 * @example
 * opts参数:{
 *  gateway: gateway
 * }
 * @return {Object} service
 */
module.exports = exports['default'];