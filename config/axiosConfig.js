const axios = require('axios')
const { HEADER } = require('../libs/constants')
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false
});

const API = axios.create({
  headers: {
    'Content-Type': HEADER.CONTENT_TYPE,

  },
  httpsAgent: agent ,
  timeout: HEADER.TIMEOUT
})

API.interceptors.request.use(
  config => {
    const newConfig = { ...config }
    newConfig.metadata = { startTime: new Date() }
    return newConfig
  },
  error => {
    return Promise.reject(error)
  }
)

API.interceptors.response.use(
  response => {
    const newRes = { ...response }
    newRes.config.metadata.endTime = new Date()
    newRes.data.response = response
    newRes.data.request = newRes.request
    newRes.data.duration = newRes.config.metadata.endTime - newRes.config.metadata.startTime
    return newRes.data
  },
  error => {
    const newError = { ...error }
    newError.config.metadata.endTime = new Date()
    newError.duration =
      newError.config.metadata.endTime - newError.config.metadata.startTime
    return Promise.reject(newError)
  }
)
module.exports = API
