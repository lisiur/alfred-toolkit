const Cache = require('./cache')
const get = require('./get')
const getJson = require('./getJson')
const download = require('./download')
const fileFilter = require('./fileFilter')
module.exports = {
  input: require('./input'),
  output: require('./output'),
  get,
  getCache: Cache.cache(get),
  getJson,
  getJsonCache: Cache.cache(getJson),
  download,
  downloadCache: Cache.cache(download),
  fileFilter
}
