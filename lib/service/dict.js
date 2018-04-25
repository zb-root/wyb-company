let path = require('path')
let xlsx = require('xlsx')

module.exports = function (service, opts = {}) {
  let logger = service.getLogger('main', __filename)

  let workbook
  let dict = {}
  let p = path.join(__dirname, '../../config/dict.xlsx')
  try {
    workbook = xlsx.readFile(p) // 打开文件
  } catch (e) {
    logger.warn('no such file or directory, open ' + p)
    return dict
  }

  let sheetNames = workbook.SheetNames // 获取标签页数组
  let worksheet = workbook.Sheets[sheetNames[0]]
  let rows = xlsx.utils.sheet_to_json(worksheet, {range: 1})
  rows.forEach(function (item) {
    dict[item.type] || (dict[item.type] = [])
    let ary = dict[item.type]
    ary.push({code: item.code, name: item.name})
  })

  return dict
}
