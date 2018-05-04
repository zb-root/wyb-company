let path = require('path')
let xlsx = require('xlsx')
let async = require('async')
let fse = require('fs-extra')
let mapping = require('./mapping')
let synctime = require('../../config/sync')

module.exports = function (service, opts = {}) {
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
            data[key] = doc[k] + '_' + doc['PROVICE']
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
            data[key] = doc[k] + '_' + doc['SJGSDWDM'].slice(0, 2)
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
          if (key === '_id' || key === 'company') {
            data[key] = doc[k] + '_' + doc['SJGSDWDM'].slice(0, 2)
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
            data[key] = doc[k] + '_' + doc['SJGSDWDM'].slice(0, 2)
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
            data[key] = doc[k] + '_' + doc['SJGSDWDM'].slice(0, 2)
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
    },
    signMarkImport: function (cb) {
      logger.info('signMark sync data start')
      let fileName = '050722'
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
          logger.info('signMark sync data progress (%s / %s  %s%)', progress, totle, Math.floor(progress / totle * 100))
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
            data[key] = doc[k] + '_' + doc['SJGSDWDM'].slice(0, 2)
          } else if (key === 'regtime') {
            if (!isNaN(Date.parse(doc[k]))) data[key] = doc[k]
          } else {
            key && (data[key] = doc[k])
          }
        }
        if (data.crtime) {
          let updateTime = new Date(data.crtime)
          if (updateTime.getTime() < syncTime) {
            setTimeout(function () { callback() }, 10)
            return
          }
        }
        service.signMark.update({_id: data._id}, data, {upsert: true}, function (err, doc) {
          err && console.log(err)
          err && logger.warn('signMark未同步数据: ' + JSON.stringify(data))
          callback()
        })
      }, function (err) {
        tt && clearTimeout(tt)
        logger.info('signMark data Import %s completion', rows.length)

        cb && cb()
        // 记录同步时间
        service.signMark.findOne({}, {crtime: 1}, {sort: {crtime: -1}}, function (err, doc) {
          if (doc && doc.crtime) {
            let d = new Date(doc.crtime)
            etl.syncTime[fileName] = d.getTime()
            fse.writeJsonSync(path.join(__dirname, '../../config/sync.json'), etl.syncTime)
          }
        })
      })
    },
    signAllotImport: function (cb) {
      logger.info('signAllot sync data start')
      let fileName = '050724'
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
          logger.info('signAllot sync data progress (%s / %s  %s%)', progress, totle, Math.floor(progress / totle * 100))
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
            data[key] = doc[k] + '_' + doc['SJGSDWDM'].slice(0, 2)
          } else if (key === 'regtime') {
            if (!isNaN(Date.parse(doc[k]))) data[key] = doc[k]
          } else {
            key && (data[key] = doc[k])
          }
        }
        if (data.crtime) {
          let updateTime = new Date(data.crtime)
          if (updateTime.getTime() < syncTime) {
            setTimeout(function () { callback() }, 10)
            return
          }
        }
        service.signAllot.update({_id: data._id}, data, {upsert: true}, function (err, doc) {
          err && console.log(err)
          err && logger.warn('signAllot未同步数据: ' + JSON.stringify(data))
          callback()
        })
      }, function (err) {
        tt && clearTimeout(tt)
        logger.info('signAllot data Import %s completion', rows.length)

        cb && cb()
        // 记录同步时间
        service.signAllot.findOne({}, {crtime: 1}, {sort: {crtime: -1}}, function (err, doc) {
          if (doc && doc.crtime) {
            let d = new Date(doc.crtime)
            etl.syncTime[fileName] = d.getTime()
            fse.writeJsonSync(path.join(__dirname, '../../config/sync.json'), etl.syncTime)
          }
        })
      })
    },
    trackWPImport: function (code, cb) {
      logger.info('trackWP(%s) sync data start', code)
      let fileName = code
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
          logger.info('trackWP(%s) sync data progress (%s / %s  %s%)', code, progress, totle, Math.floor(progress / totle * 100))
          printProgress()
        }, 60 * 1000)
      }

      printProgress()

      let m = {'050709': 2, '050711': 3, '050713': 1, '050715': 4, '050717': 5, '050719': 6, '050721': 7}
      async.eachSeries(rows, function (doc, callback) {
        progress++
        let data = {}
        for (let k in doc) {
          let key = map[k]
          key && (data[key] = doc[k])
        }
        data.type = m[code]
        if (data.regtime) {
          let updateTime = new Date(data.regtime)
          if (updateTime.getTime() < syncTime) {
            setTimeout(function () { callback() }, 10)
            return
          }
        }
        service.track.update({_id: data._id}, data, {upsert: true}, function (err, doc) {
          err && console.log(err)
          err && logger.warn('trackWP未同步数据: ' + JSON.stringify(data))
          callback()
        })
      }, function (err) {
        tt && clearTimeout(tt)
        logger.info('trackWP(%s) data Import %s completion', code, rows.length)

        cb && cb()
        // 记录同步时间
        service.track.findOne({}, {regtime: 1}, {sort: {regtime: -1}}, function (err, doc) {
          if (doc && doc.regtime) {
            let d = new Date(doc.regtime)
            etl.syncTime[fileName] = d.getTime()
            fse.writeJsonSync(path.join(__dirname, '../../config/sync.json'), etl.syncTime)
          }
        })
      })
    },
    trackInfoImport: function (code, cb) {
      logger.info('trackInfo(%s) sync data start', code)
      let fileName = code
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
          logger.info('trackInfo(%s) sync data progress (%s / %s  %s%)', code, progress, totle, Math.floor(progress / totle * 100))
          printProgress()
        }, 60 * 1000)
      }

      printProgress()

      async.eachSeries(rows, function (doc, callback) {
        progress++
        let data = {}
        for (let k in doc) {
          let key = map[k]
          if (key === 'company' || key === 'storage') {
            data[key] = doc[k] + '_' + doc['SJGSDWDM'].slice(0, 2)
          } else if (key === 'regtime') {
            if (!isNaN(Date.parse(doc[k]))) data[key] = doc[k]
          } else {
            if (key) {
              let keys = key.split('.') || []
              if (keys[0] === 'ext') {
                data[keys[0]] || (data[keys[0]] = {})
                let obj = data[keys[0]]
                if (keys[1] === 'companyCode' || keys[1] === 'storageCode') {
                  obj[keys[1]] = doc[k] + '_' + doc['SJGSDWDM'].slice(0, 2)
                } else {
                  obj[keys[1]] = doc[k]
                }
              } else {
                data[key] = doc[k]
              }
            }
          }
        }
        if (data.regtime) {
          let updateTime = new Date(data.regtime)
          if (updateTime.getTime() < syncTime) {
            setTimeout(function () { callback() }, 10)
            return
          }
        }
        service.track.update({code: data.code}, data, {multi: true}, function (err, doc) {
          err && console.log(err)
          err && logger.warn('trackInfo未同步数据: ' + JSON.stringify(data))
          callback()
        })
      }, function (err) {
        tt && clearTimeout(tt)
        logger.info('trackInfo(%s) data Import %s completion', code, rows.length)

        cb && cb()
        // 记录同步时间
        service.track.findOne({}, {regtime: 1}, {sort: {regtime: -1}}, function (err, doc) {
          if (doc && doc.regtime) {
            let d = new Date(doc.regtime)
            etl.syncTime[fileName] = d.getTime()
            fse.writeJsonSync(path.join(__dirname, '../../config/sync.json'), etl.syncTime)
          }
        })
      })
    },
    trackFlowImport: function (cb) {
      logger.info('trackFlow sync data start')
      let fileName = '050723'
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
          logger.info('trackFlow sync data progress (%s / %s  %s%)', progress, totle, Math.floor(progress / totle * 100))
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
        data.code = data.code.split('_')[0]
        if (doc['DJSJ']) {
          let updateTime = new Date(doc['DJSJ'])
          if (updateTime.getTime() < syncTime) {
            setTimeout(function () { callback() }, 10)
            return
          }
        }
        service.track.update({code: data.code}, data, {multi: true}, function (err, doc) {
          err && console.log(err)
          err && logger.warn('trackFlow未同步数据: ' + JSON.stringify(data))
          callback()
        })
      }, function (err) {
        tt && clearTimeout(tt)
        logger.info('trackFlow data Import %s completion', rows.length)

        cb && cb()
        // 记录同步时间
        service.track.findOne({}, {regtime: 1}, {sort: {regtime: -1}}, function (err, doc) {
          if (doc && doc.regtime) {
            let d = new Date(doc.regtime)
            etl.syncTime[fileName] = d.getTime()
            fse.writeJsonSync(path.join(__dirname, '../../config/sync.json'), etl.syncTime)
          }
        })
      })
    }
  }

  async.waterfall([
    // function (cb) {
    //   etl.companyImport(function () {cb()})
    // },
    // function (cb) {
    //   etl.chemicalImport(function () {cb()})
    // },
    // function (cb) {
    //   etl.employeeImport(function () {cb()})
    // },
    // function (cb) {
    //   etl.storageImport(function () {cb()})
    // },
    // function (cb) {
    //   etl.goodsImport(function () {cb()})
    // },
    // function (cb) {
    //   etl.truckImport(function () {cb()})
    // },
    // function (cb) {
    //   etl.signMarkImport(function () {cb()})
    // },
    // function (cb) {
    //   etl.signAllotImport(function () {cb()})
    // },
    // function (cb) {
    //   etl.trackWPImport('050709', function () {cb()})
    // },
    // function (cb) {
    //   etl.trackWPImport('050711', function () {cb()})
    // },
    // function (cb) {
    //   etl.trackWPImport('050713', function () {cb()})
    // },
    // function (cb) {
    //   etl.trackWPImport('050715', function () {cb()})
    // },
    // function (cb) {
    //   etl.trackWPImport('050717', function () {cb()})
    // },
    // function (cb) {
    //   etl.trackWPImport('050719', function () {cb()})
    // },
    // function (cb) {
    //   etl.trackWPImport('050721', function () {cb()})
    // },
    // function (cb) {
    //   etl.trackInfoImport('050708', function () {cb()})
    // },
    // function (cb) {
    //   etl.trackInfoImport('050710', function () {cb()})
    // },
    // function (cb) {
    //   etl.trackInfoImport('050712', function () {cb()})
    // },
    // function (cb) {
    //   etl.trackInfoImport('050714', function () {cb()})
    // },
    // function (cb) {
    //   etl.trackInfoImport('050716', function () {cb()})
    // },
    // function (cb) {
    //   etl.trackInfoImport('050718', function () {cb()})
    // },
    // function (cb) {
    //   etl.trackInfoImport('050720', function () {cb()})
    // },
    // function (cb) {
    //   etl.trackFlowImport(function () {cb()})
    // }
  ], function () {
    logger.info('All data sync completion')
  })

  // etl.companyImport()
  // etl.chemicalImport()
  // etl.employeeImport()
  // etl.storageImport()
  // etl.goodsImport()
  // etl.truckImport()
  // etl.signMarkImport()
  // etl.signAllotImport()
  // etl.trackWPImport('050709')
  // etl.trackWPImport('050711')
  // etl.trackWPImport('050713')
  // etl.trackWPImport('050715')
  // etl.trackWPImport('050717')
  // etl.trackWPImport('050719')
  // etl.trackWPImport('050721')
  // etl.trackInfoImport('050708')
  // etl.trackInfoImport('050710')
  // etl.trackInfoImport('050712')
  // etl.trackInfoImport('050714')
  // etl.trackInfoImport('050716')
  // etl.trackInfoImport('050718')
  // etl.trackInfoImport('050720')
  // etl.trackFlowImport()

  return etl
}
