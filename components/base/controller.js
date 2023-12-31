const _ = require('lodash')
const appConst = require('../../libs/constants')
const moment = require('moment')
const { errLogger } = require('../../config/logger')
const { ER_CONFLICT, BAD_REQUEST } = require('../../libs/constants')

const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
const { ERROR, SUCCESS } = appConst

class Controller {
  constructor () {
    this.response = {}
  }

  static responseFormat () {
    return {
      status: '',
      message: '',
      data: {}
    }
  }

  static formatLogs (req, res) {
    let id
    let role
    let reqIp

    if (_.has(req, 'userData')) {
      id = req.userData.id ? req.userData.id : ''
      role = req.userData.role ? req.userData.role : ''
    }

    if (_.has(req, 'headers') && _.has(req.headers, 'x-client-ip')) {
      reqIp = req.headers['x-client-ip']
    } else {
      reqIp = req.ip ? req.ip : ''
    }

    return {
      reqTime: currentTime,
      reqUrl: req.url ? req.url : '',
      reqMethod: req.method ? req.method : '',
      reqIp,
      reqParams: req.params ? req.params : '',
      reqBody: req.body ? req.body : '',
      reqQuery: req.query ? req.query : '',
      reqUserId: id,
      reqUserRole: role,
      response: res
    }
  }

  static errorResponse (req, error) {
    const response = Controller.responseFormat()
    response.status = ERROR.MSG

    if (_.has(error, 'data')) {
      response.data = error.data
    } else {
      delete response.data
    }

    if (_.has(error, 'message')) {
      response.message = error.message
    }

    const logData = Controller.formatLogs(req, response)
    errLogger.error(logData)

    return response
  }

  static successResponse (success) {
    const response = Controller.responseFormat()
    response.status = SUCCESS.MSG
    if (_.has(success, 'data')) {
      response.data = success.data
    } else {
      delete response.data
    }
    if (_.has(success, 'count')) {
      response.count = success.count
    } else {
      delete response.count
    }
    if (_.has(success, 'message')) {
      response.message = success.message
    } else {
      delete response.message
    }
    return response
  }

  sendResponse (req, res, type, resToSend) {
    this.response = {}
    if (type === ERROR.CODE) {
      this.response = Controller.errorResponse(req, resToSend)
      return res.status(400).json(this.response)
    } else if (type === ER_CONFLICT.CODE) {
      this.response = resToSend
      return res.status(409).json(this.response)
    } else if (type === BAD_REQUEST.CODE) {
      this.response = resToSend
      return res.status(BAD_REQUEST.CODE).json(this.response)
    } else {
      this.response = Controller.successResponse(resToSend)
      return res.json(this.response)
    }
  }

  permittedParams (params, acceptedKeys) {
    if (!_.isEmpty(params)) {
      const mappedParams = _.mapKeys(params, function (value, key) {
        const paramsMap = {}
        return paramsMap[key] || key
      })
      return _.pick(mappedParams, acceptedKeys)
    }
    return {}
  }
}

module.exports = Controller
