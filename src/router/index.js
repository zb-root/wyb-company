import async from 'async'
import _ from 'lodash'
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
  })

  return router
}
