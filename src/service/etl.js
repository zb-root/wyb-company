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
    companyImport: function (cb) {
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

        cb && cb()
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
    chemicalImport: function (cb) {
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
          } else if (key === 'company') {
            data[key] = doc['FRHQTZZTYSHXYDM'] + '_' + doc['PROVICE']
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

        cb && cb()
        // 记录同步时间
        service.chemical.findOne({}, {moditime: 1}, {sort: {moditime: -1}}, function (err, doc) {
          if (doc && doc.moditime) {
            let d = new Date(doc.moditime)
            etl.syncTime[fileName] = d.getTime()
            fse.writeJsonSync(path.join(__dirname, '../../config/sync.json'), etl.syncTime)
          }
        })
      })
    },
    employeeImport: function (cb) {
      logger.info('employee sync data start')
      let fileName = '050704'
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
          logger.info('employee sync data progress (%s / %s  %s%)', progress, totle, Math.floor(progress / totle * 100))
          printProgress()
        }, 60 * 1000)
      }

      printProgress()

      async.eachSeries(rows, function (doc, callback) {
        progress++
        let data = {}
        for (let k in doc) {
          let key = map[k]
          if (key === 'company') {
            data[key] = doc['FRHQTZZTYSHXYDM'] + '_' + doc['SJGSDWDM'].slice(0, 2)
          } else if (key === 'ZGZBF_RQ' || key === 'ZGZ_YXQJZRQ' || key === 'birthday') {
            if (!isNaN(Date.parse(doc[k]))) data[key] = doc[k]
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
        service.employee.update({_id: data._id}, data, {upsert: true}, function (err, doc) {
          err && console.log(err)
          err && logger.warn('employee未同步数据: ' + JSON.stringify(data))
          callback()
        })
      }, function (err) {
        tt && clearTimeout(tt)
        logger.info('employee data Import %s completion', rows.length)

        cb && cb()
        // 记录同步时间
        service.employee.findOne({}, {moditime: 1}, {sort: {moditime: -1}}, function (err, doc) {
          if (doc && doc.moditime) {
            let d = new Date(doc.moditime)
            etl.syncTime[fileName] = d.getTime()
            fse.writeJsonSync(path.join(__dirname, '../../config/sync.json'), etl.syncTime)
          }
        })
      })
    },
    storageImport: function (cb) {
      logger.info('storage sync data start')
      let fileName = '050705'
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
          logger.info('storage sync data progress (%s / %s  %s%)', progress, totle, Math.floor(progress / totle * 100))
          printProgress()
        }, 60 * 1000)
      }

      printProgress()

      async.eachSeries(rows, function (doc, callback) {
        progress++
        let data = {}
        for (let k in doc) {
          let key = map[k]
          if (key === '_id') {
            data[key] = doc['YZBCCCSBM'] + '_' + doc['SJGSDWDM'].slice(0, 2)
          } else if (key === 'company') {
            data[key] = doc['FRHQTZZTYSHXYDM'] + '_' + doc['SJGSDWDM'].slice(0, 2)
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
        service.storage.update({_id: data._id}, data, {upsert: true}, function (err, doc) {
          err && console.log(err)
          err && logger.warn('storage未同步数据: ' + JSON.stringify(data))
          callback()
        })
      }, function (err) {
        tt && clearTimeout(tt)
        logger.info('storage data Import %s completion', rows.length)

        cb && cb()
        // 记录同步时间
        service.storage.findOne({}, {moditime: 1}, {sort: {moditime: -1}}, function (err, doc) {
          if (doc && doc.moditime) {
            let d = new Date(doc.moditime)
            etl.syncTime[fileName] = d.getTime()
            fse.writeJsonSync(path.join(__dirname, '../../config/sync.json'), etl.syncTime)
          }
        })
      })
    },
    goodsImport: function (cb) {
      logger.info('goods sync data start')
      let fileName = '050706'
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
          logger.info('goods sync data progress (%s / %s  %s%)', progress, totle, Math.floor(progress / totle * 100))
          printProgress()
        }, 60 * 1000)
      }

      printProgress()

      async.eachSeries(rows, function (doc, callback) {
        progress++
        let data = {}
        for (let k in doc) {
          let key = map[k]
          if (key === 'storage') {
            data[key] = doc['YZBCCCSBM'] + '_' + doc['SJGSDWDM'].slice(0, 2)
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
        service.goods.update({_id: data._id}, data, {upsert: true}, function (err, doc) {
          err && console.log(err)
          err && logger.warn('goods未同步数据: ' + JSON.stringify(data))
          callback()
        })
      }, function (err) {
        tt && clearTimeout(tt)
        logger.info('goods data Import %s completion', rows.length)

        cb && cb()
        // 记录同步时间
        service.goods.findOne({}, {moditime: 1}, {sort: {moditime: -1}}, function (err, doc) {
          if (doc && doc.moditime) {
            let d = new Date(doc.moditime)
            etl.syncTime[fileName] = d.getTime()
            fse.writeJsonSync(path.join(__dirname, '../../config/sync.json'), etl.syncTime)
          }
        })
      })
    },
    truckImport: function (cb) {
      logger.info('goods sync data start')
      let fileName = '050707'
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
          logger.info('truck sync data progress (%s / %s  %s%)', progress, totle, Math.floor(progress / totle * 100))
          printProgress()
        }, 60 * 1000)
      }

      printProgress()

      async.eachSeries(rows, function (doc, callback) {
        progress++
        let data = {}
        for (let k in doc) {
          let key = map[k]
          if (key === 'company') {
            data[key] = doc['FRHQTZZTYSHXYDM'] + '_' + doc['SJGSDWDM'].slice(0, 2)
          } else if (key === 'drivingExpire' || key === 'licenseExpire') {
            if (!isNaN(Date.parse(doc[k]))) data[key] = doc[k]
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
        service.truck.update({_id: data._id}, data, {upsert: true}, function (err, doc) {
          err && console.log(err)
          err && logger.warn('truck未同步数据: ' + JSON.stringify(data))
          callback()
        })
      }, function (err) {
        tt && clearTimeout(tt)
        logger.info('truck data Import %s completion', rows.length)

        cb && cb()
        // 记录同步时间
        service.truck.findOne({}, {moditime: 1}, {sort: {moditime: -1}}, function (err, doc) {
          if (doc && doc.moditime) {
            let d = new Date(doc.moditime)
            etl.syncTime[fileName] = d.getTime()
            fse.writeJsonSync(path.join(__dirname, '../../config/sync.json'), etl.syncTime)
          }
        })
      })
    }
  }

  // async.waterfall([
  //   function (cb) {
  //     etl.companyImport(cb)
  //   },
  //   function (cb) {
  //     etl.chemicalImport(cb)
  //   },
  //   function (cb) {
  //     etl.employeeImport(cb)
  //   },
  //   function (cb) {
  //     etl.storageImport(cb)
  //   },
  //   function (cb) {
  //     etl.goodsImport(cb)
  //   },
  //   function (cb) {
  //     etl.truckImport(cb)
  //   }
  // ], function () {
  //   logger.info('All data sync completion')
  // })

  // etl.companyImport()
  // etl.chemicalImport()
  // etl.employeeImport()
  // etl.storageImport()
  // etl.goodsImport()
  // etl.truckImport()

  return etl
}
