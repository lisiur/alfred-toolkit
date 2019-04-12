const Cache = require('./cache')
const get = require('./get')
module.exports = {
  input: require('./input'),
  output: require('./output'),
  get,
  getCache: Cache.cache(get),
  getJson: require('./getJson'),
  download: require('./download'),
}
