import service from './service'
import router from './router'

export default (opts = {}) => {
  ['db', 'gateway', 'lng', 'utcOffset']
    .forEach(function (key) {
      process.env[key] && (opts[key] = process.env[key])
    })
  opts.utcOffset = Number(opts.utcOffset)

  let o = service(opts)
  o.router = router
  return o
}
