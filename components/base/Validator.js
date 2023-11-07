const BaseController = require('./controller')
const { ERROR, HEADER, SUCCESS } = require('../../libs/constants')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const { errLogger } = require('../../config/logger')

class Validator {
  init (validator) {
    this.validator = validator
    return this
  }

  getRequestData (req) {
    let reqData
    const method = req.method
    const path = req.route.path
    switch (method) {
      case 'POST':
      case 'PUT':
        reqData = req.body
        break
      case 'GET':
      case 'DELETE':
        reqData = path === '/' ? req.query : req.params
        break
      default:
        reqData = req.body
    }

    return reqData
  }

  static verifyJWTToken (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err || !decoded) {
          return reject(err)
        }
        return resolve(decoded)
      })
    })
  }

  static hasValidHeader (req) {
    const reqHeader = req.headers
    return (
      _.has(reqHeader, HEADER.TOKEN)
    )
  }

  async validateRequest (req, res, next) {
    const userData = req.body && req.body.userData
    if (userData) {
      delete req.body.userData
    } else if (Validator.hasValidHeader(req)) {
      const decodedToken = await Validator.verifyJWTToken(req.headers[HEADER.TOKEN]).catch((e) => {
        errLogger.error(e)
      })
      if (_.has(decodedToken, 'role')) {
        req.userData = decodedToken
      }
    }
    const reqData = this.getRequestData(req)
    const r = this.validator.validate(reqData)
    if (r.error === null) {
      if (userData) {
        req.userData = userData
      } else if (/userApplications/.test(req.baseUrl) && req.method !== 'POST') {
        const validHeader = Validator.hasValidHeader(req)
        if (validHeader) {
          const decodedToken = await Validator.verifyJWTToken(req.headers[HEADER.TOKEN]).catch((e) => {
            errLogger.error(e)
          })
          if (_.has(decodedToken, 'role')) {
            req.userData = decodedToken
          } else {
            new BaseController().sendResponse(req, res, ERROR.CODE, { message: 'unauthorized' })
          }
        } else {
          new BaseController().sendResponse(req, res, ERROR.CODE, { message: 'unauthorized' })
        }
      }
      next()
    } else {
      const joiMsg = r.error.details[0].message
      new BaseController().sendResponse(req, res, ERROR.CODE, { message: `server_error.${joiMsg}` })
    }
  }

  validateResponse (req, res) {
    const data = res.data
    if (!_.isUndefined(data)) {
      if (!_.has(data, 'error')) {
        data.created = data.modified
        const allowedAttr = ['id', 'created']
        const formattedData = this.permittedParams(data, allowedAttr)
        const result = this.validator.validate(formattedData)
        if (result.error === null) {
          this.sendResponse(req, res, SUCCESS.CODE, [result.value])
        } else {
          this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.invalid_params' })
        }
        res.json({ success: true })
      } else {
        res.json({ success: false })
      }
    }
  }
}

module.exports = Validator
