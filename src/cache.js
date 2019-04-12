const fs = require('fs')
let cacheFile = './cache.json'

module.exports = {
  store(content) {
    if (!fs.existsSync(cacheFile)) {
      fs.writeFileSync(cacheFile, '{}')
    }
    if (!content) {
      return JSON.parse(fs.readFileSync(cacheFile).toString())
    } else {
      fs.writeFileSync(cacheFile, JSON.stringify(content))
    }
  },
  set(key, val) {
    const store = this.store()
    store[key] = val
    this.store(store)
    return val
  },
  get(key) {
    return this.store()[key]
  },
  cache(fn) {
    return async (...args) => {
      const key = JSON.stringify(args)
      const val = this.get(key)
      if (val) {
        return val
      } else {
        return this.set(key, await fn(...args))
      }
    }
  },
}
