import path from 'path'
import xlsx from 'xlsx'
import async from 'async'
import fse from 'fs-extra'
import mapping from './mapping'
import synctime from '../../config/sync'

export default function (service, opts = {}) {
  let logger = service.getLogger('main', __filename)

  let etl = {
    syncTime: synctime,
    companyImport: function () {
      logger.info('company sync data start')
      let fileName = '050701'
      let p = path.join(__dirname, '../../data/' + fileName + '.xlsx')
      let workbook = xlsx.readFile(p) // 打开文件
      let sheetNames = workbook.SheetNames // 获取标签页数组
      let worksheet = workbook.Sheets[sheetNames[0]]
      let rows = xlsx.utils.sheet_to_json(worksheet, {})
      let map = mapping[fileName]
      let syncTime = etl.syncTime[fileName] || 0

      let progress = 0
      let totle = rows.length
      let tt
      function printProgress () {
        if (progress >= totle) return
        tt = setTimeout(function () {
          logger.info('company sync data progress (%s / %s  %s%)', progress, totle, Math.floor(progress / totle * 100))
          printProgress()
        }, 60 * 1000)
      }
      printProgress()

      async.eachSeries(rows, function (doc, callback) {
        progress++
        let data = {}
        for (let k in doc) {
          let key = map[k]
          key && (data[key] = doc[k])
        }
        if (data.moditime) {
          let updateTime = new Date(data.moditime)
          if (updateTime.getTime() < syncTime) {
            setTimeout(function () { callback() }, 10)
            return
          }
        }

        data.authState = Number(data.YYZZ) || Number(data.WXHXPAQSCXKZ) || Number(data.WXHXPJYXKZ) || Number(data.WXHXPAQSYXKZ) || Number(data.WXHXPAQPJBG)
        service.company.update({_id: data._id}, data, {upsert: true}, function (err, doc) {
          err && console.log(err)
          err && logger.warn('company未同步数据: ' + JSON.stringify(data))
          callback()
        })
      }, function (err) {
        tt && clearTimeout(tt)
        logger.info('company data Import %s completion', rows.length)

        // 记录同步时间
        service.company.findOne({}, {moditime: 1}, {sort: {moditime: -1}}, function (err, doc) {
          if (doc && doc.moditime) {
            let d = new Date(doc.moditime)
            etl.syncTime[fileName] = d.getTime()
            fse.writeJsonSync(path.join(__dirname, '../../config/sync.json'), etl.syncTime)
          }
        })
      })
    },
    chemicalImport: function () {
      logger.info('chemical sync data start')
      let fileName = '050702'
      let p = path.join(__dirname, '../../data/' + fileName + '.xlsx')
      let workbook = xlsx.readFile(p) // 打开文件
      let sheetNames = workbook.SheetNames // 获取标签页数组
      let worksheet = workbook.Sheets[sheetNames[0]]
      let rows = xlsx.utils.sheet_to_json(worksheet, {})
      let map = mapping[fileName]
      let syncTime = etl.syncTime[fileName] || 0

      let progress = 0
      let totle = rows.length
      let tt
      function printProgress () {
        if (progress >= totle) return
        tt = setTimeout(function () {
          logger.info('chemical sync data progress (%s / %s  %s%)', progress, totle, Math.floor(progress / totle * 100))
          printProgress()
        }, 60 * 1000)
      }
      printProgress()

      async.eachSeries(rows, function (doc, callback) {
        progress++
        let data = {}
        for (let k in doc) {
          let key = map[k]
          if (key === 'operationModes') {
            data[key] || (data[key] = [])
            if (Number(doc[k])) {
              if (k === 'SFSJSC_PDBZ') data[key].push('生产')
              if (k === 'SFSJJY_PDBZ') data[key].push('经营')
              if (k === 'SFSJCC_PDBZ') data[key].push('储存')
              if (k === 'SFSJSY_PDBZ') data[key].push('使用')
            }
          } else {
            key && (data[key] = doc[k])
          }
        }
        if (data.moditime) {
          let updateTime = new Date(data.moditime)
          if (updateTime.getTime() < syncTime) {
            setTimeout(function () { callback() }, 10)
            return
          }
        }
        service.chemical.update({_id: data._id}, data, {upsert: true}, function (err, doc) {
          err && console.log(err)
          err && logger.warn('chemical未同步数据: ' + JSON.stringify(data))
          service.company.update({_id: data.company}, {
            $addToSet: {
              operationModes: {$each: data.operationModes},
              chemicals: {$each: [data.name]}
            }
          }, function (err, doc) {
            callback()
          })
        })
      }, function (err) {
        tt && clearTimeout(tt)
        logger.info('chemical data Import %s completion', rows.length)

        // 记录同步时间
        service.chemical.findOne({}, {moditime: 1}, {sort: {moditime: -1}}, function (err, doc) {
          if (doc && doc.moditime) {
            let d = new Date(doc.moditime)
            etl.syncTime[fileName] = d.getTime()
            fse.writeJsonSync(path.join(__dirname, '../../config/sync.json'), etl.syncTime)
          }
        })
      })
    }
  }

  // etl.companyImport()
  // etl.chemicalImport()

  return etl
}
