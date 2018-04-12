require('log4js').configure(require('path').join(__dirname, 'log4js.json'))
var config = {
  development: {
    port: 3000,
    lng: 'zh_CN',
    db: 'mongodb://root:123@api.h5.jamma.cn/wyb?authSource=admin',
    gateway: 'http://api.h5.jamma.cn:81',
    modules: {
      'company': {
        module: process.cwd() + '/src'
      }
    }
  },
  production: {
    port: 80,
    lng: 'zh_CN',
    db: 'mongodb://mongo.db/company',
    modules: {
      'company': {
        module: process.cwd() + '/lib'
      }
    }
  }
}

var env = process.env.NODE_ENV || 'development'
config = config[env] || config['development']
config.env = env

module.exports = config
