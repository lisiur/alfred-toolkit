const fetch = require('./fetch')

module.exports = (url, options) => {
  const newOptions = Object.assign(
    {
      method: 'get',
      responseType: 'json',
      headers: {
        accept: 'application/json',
      },
    },
    options
  )
  return fetch(url, newOptions)
}
