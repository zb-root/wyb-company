import Promise from 'bluebird'
import _ from 'lodash'
import jm from 'jm-dao'
import event from 'jm-event'
import MS from 'jm-ms'
import error from 'jm-err'
import t from '../locale'
import consts from '../consts'
import Logger from './logger'

let ms = MS()
let Err = _.defaults(error.Err, consts.Err)
let logger = Logger('main', __filename)

/**
 * game-server service
 * @param {Object} opts
 * @example
 * opts参数:{
 *  gateway: gateway
 * }
 * @return {Object} service
 */
export default function (opts = {}) {
  let o = {
    ready: false,
    config: opts,
    getLogger: Logger,
    Err: Err,
    t: function (doc, lng, tr) {
      if (typeof lng === 'object') {
        tr = lng
        lng = null
      }
      lng || (lng = opts.lng)
      if (doc && lng && doc.err && doc.msg) {
        doc = {
          err: doc.err,
          msg: t(doc.msg, lng) || Err.t(doc.msg, lng) || doc.msg
        }
      }
      if (tr) {
        doc.msg = error.errMsg(doc.msg, tr)
      }
      return doc
    },
    fillZero: function (num, length) {
      if (isNaN(num)) return
      num = '' + num
      if (num.length > length) length = num.length
      return (Array(length).join('0') + num).slice(-length)
    },
    onReady: function () {
      let self = this
      return new Promise(function (resolve, reject) {
        if (self.ready) return resolve(self.ready)
        self.on('ready', function () {
          resolve()
        })
      })
    }
  }
  event.enableEvent(o)

  // 绑定api接口
  let bind = function (name, alias, uri) {
    uri === undefined && (uri = opts.gateway + '/' + name)
    ms.client({
      uri: uri
    }, function (err, doc) {
      !err && doc && (o[alias || name] = doc)
    })
  }
  bind('sso')
  bind('passport')
  bind('user')
  bind('acl')

  let cb = function (db) {
    opts.db = db
    o.sq = jm.sequence({db: db})
    o.ready = true
    o.emit('ready')
    logger.info('服务启动')
  }

  if (!opts.db) {
    opts.db = jm.db.connect().then(cb)
  } else if (typeof opts.db === 'string') {
    opts.db = jm.db.connect(opts.db).then(cb)
  }

  return o
}