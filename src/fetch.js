const http = require('http')
const https = require('https')
const URL = require('url').URL

const getProtocol = url => new URL(url).protocol
const getRequest = url =>
  getProtocol(url) === 'http:' ? http.request : https.request

module.exports = (url, options) => {
  const newOptions = Object.assign(
    {
      headers: {},
      method: 'get',
      responseType: 'text',
    },
    options
  )
  const { hostname, port, pathname: path } = new URL(url)
  const request = getRequest(url)
  return new Promise((resolve, reject) => {
    const req = request(
      {
        hostname,
        port,
        path,
        method: newOptions.method,
        headers: newOptions.headers,
      },
      res => {
        let body = []
        switch (newOptions.responseType) {
          case 'json': {
            res
              .on('data', data => body.push(data))
              .on('end', () => {
                const response = {
                  statusCode: res.statusCode,
                  statusMessage: res.statusMessage,
                  data: JSON.parse(Buffer.concat(body).toString()),
                }
                resolve(response)
              })
            break
          }
          case 'stream': {
            const response = {
              statusCode: res.statusCode,
              statusMessage: res.statusMessage,
              data: res,
            }
            resolve(response)
            break
          }
          default: {
            res
              .on('data', data => body.push(data))
              .on('end', () => {
                const response = {
                  statusCode: res.statusCode,
                  statusMessage: res.statusMessage,
                  data: Buffer.concat(body).toString(),
                }
                resolve(response)
              })
          }
        }
      }
    )
    req.on('error', e => {
      reject(e)
    })
    req.end()
  })
}
