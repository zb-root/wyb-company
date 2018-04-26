let async = require('async')
let _ = require('lodash')
let mongoose = require('mongoose')
let daorouter = require('jm-ms-daorouter')
let MS = require('jm-ms-core')
let moment = require('moment')

let ms = new MS()
let ObjectId = mongoose.Types.ObjectId

module.exports = function (service, opts = {}) {
  let t = service.t
  let Err = service.Err
  let logger = service.getLogger('main', __filename)

  let defList = {
    conditions: {},
    options: {
      sort: [{'crtime': 1}]
    },
    fields: {signMark: 1, company: 1, storage: 1, type: 1, regtime: 1, unit: 1, amount: 1, crtime: 1, ext: 1},
    populations: [{path: 'company', select: 'code name -_id'}]
  }
  let defGet = {
    conditions: {},
    fields: {
      signMark: 1,
      company: 1,
      storage: 1,
      type: 1,
      regtime: 1,
      unit: 1,
      amount: 1,
      crtime: 1,
      ext: 1
    },
    populations: null // 没有的话一定要是不传或者null,如果是{}则查不到数据
  }

  let listOpts = opts.list || defList
  let getOpts = opts.get || defGet

  let self = service.track
  let router = ms.router()
  service.onReady().then(() => {
    router
      .use(daorouter(self, {
        list: listOpts,
        get: getOpts
      }))
    let routes = self.routes

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
      let data = opts.data || {}
      logger.debug(opts.originalUri + ' request params:' + JSON.stringify(data))
      let lng = data.lng
      if (data.page === undefined) data.page = 1
      if (data.rows === undefined) data.rows = 20
      let utcOffset = data.utcOffset
      let startDate = data.startDate
      let endDate = data.endDate
      let fields = data.fields
      let sort = data.sort
      let signCode = data.signCode
      let types = data.types
      let province = data.province
      let city = data.city

      opts.conditions || (opts.conditions = {})
      let conditions = opts.conditions
      if (startDate) {
        if (isNaN(Date.parse(startDate))) {
          return cb(null, t(Err.FA_PARAMS_FAIL, lng, {params: 'startDate'}))
        }
        startDate = new Date(startDate)
        conditions.crtime = conditions.crtime || {}
        conditions.crtime['$gte'] = startDate
      }
      if (endDate) {
        if (isNaN(Date.parse(endDate))) {
          return cb(null, t(Err.FA_PARAMS_FAIL, lng, {params: 'endDate'}))
        }
        endDate = new Date(endDate)
        conditions.crtime = conditions.crtime || {}
        conditions.crtime['$lte'] = endDate
      }
      if (province) {
        let code = province
        if (city) {
          code += city
        }
        conditions.companyCode = {$regex: '^' + code + '.*?'}
      }

      if (signCode) {
        conditions.signMark = signCode
      }

      if (types) {
        types = Array.isArray(types) ? types : types.toString().split(',')
        conditions.type = {$in: types}
      }

      if (fields) {
        if (typeof fields === 'string') {
          try {fields = JSON.parse(fields)} catch (e) {fields = null}
        }
        if (!_.isPlainObject(fields)) {
          return cb(null, t(Err.FA_PARAMS_FAIL, lng, {params: 'fields'}))
        }
        opts.fields = fields
      }

      if (sort) {
        if (typeof sort === 'string') {
          try {sort = JSON.parse(sort)} catch (e) {sort = null}
        }
        if (!_.isPlainObject(sort)) {
          return cb(null, t(Err.FA_PARAMS_FAIL, lng, {params: 'sort'}))
        }
        opts.options = {sort: sort}
      }

      next()
    }

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
      let data = opts.data || {}
      let lng = data.lng
      let fields = data.fields
      if (fields) {
        if (typeof fields === 'string') {
          try {fields = JSON.parse(fields)} catch (e) {fields = null}
        }
        if (!_.isPlainObject(fields)) {
          return cb(null, t(Err.FA_PARAMS_FAIL, lng, {params: 'fields'}))
        }
        opts.fields = fields
      }
      next()
    }

  })
  return router
}
