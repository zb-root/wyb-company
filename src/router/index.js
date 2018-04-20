import async from 'async'
import _ from 'lodash'
import moment from 'moment'
import MS from 'jm-ms-core'
import help from './help'
import company from './company'

let ms = new MS()

export default function (opts = {}) {
  let service = this
  let router = ms.router()
  let t = service.t
  let Err = service.Err
  let logger = service.getLogger('main', __filename)

  this.onReady().then(() => {
    router
      .use(help(service))
      .use('/infos', company(service))
      .add('/dict', 'get', function (opts, cb, next) {
        let data = opts.data
        let type = data.type
        let ret = {}
        if (type) {
          ret[type] = service.dict[type] || []
        } else {
          ret = service.dict
        }
        cb(null, ret)
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
        let data = opts.data
        let lng = data.lng
        let year = data.year
        let province = data.province
        let type = data.type
        let utcOffset = data.utcOffset || service.config.utcOffset
        let UTC = Number(utcOffset || 0)
        let startDate
        let endDate
        if (year) {
          year += '-01'
          startDate = moment(year).utcOffset(-UTC).startOf('year').utcOffset(0)
          endDate = moment(year).utcOffset(-UTC).endOf('year').utcOffset(0)
        } else {
          startDate = moment().utcOffset(-UTC).startOf('year').utcOffset(0)
          endDate = moment().utcOffset(-UTC).endOf('year').utcOffset(0)
        }

        let model = {
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
        }

        model = model[type]
        if (!model) {
          return cb(null, t(Err.FA_PARAMS_FAIL, lng, {params: 'type'}))
        }

        let conditions = {crtime: {$gte: startDate.toDate(), $lte: endDate.toDate()}}
        if (province) {
          conditions.companyCode = {$regex: '^' + province + '.*?'}
        }
        if (type == 7 || type == 8 || type == 9 || type == 10) {
          conditions.type = type - 6
        }
        let q = model.aggregate()
        q.match(conditions)
        q.project({
          date: {$dateToString: {format: '%Y', date: {'$add': ['$crtime', -UTC * 60 * 1000]}}},
          province: {$substr: ['$companyCode', 0, 2]}
        })
        q.group({
          _id: {date: '$date', province: '$province'},
          count: {$sum: 1}
        })
        q.sort({count: -1})
        q.exec(function (err, result) {
          if (err) {
            console.log(err)
            return cb(null, t(Err.FA_SYS, lng))
          }
          cb(null, {rows: result || []})
        })
      })
  })

  return router
}
