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
  })

  return router
}
