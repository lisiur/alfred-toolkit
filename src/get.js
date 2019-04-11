const fetch = require('./fetch')

module.exports = (url, options) => {
  const newOptions = Object.assign(
    {
      method: 'get',
    },
    options
  )
  return fetch(url, newOptions)
}
