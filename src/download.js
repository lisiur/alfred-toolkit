const fs = require('fs')
const fetch = require('./fetch')

module.exports = (targetPath, url, options) => {
  const newOptions = Object.assign(
    {
      method: 'get',
      responseType: 'stream',
    },
    options
  )
  const file = fs.createWriteStream(targetPath)
  return fetch(url, newOptions).then(res => {
    res.data.pipe(file)
    return targetPath
  })
}
