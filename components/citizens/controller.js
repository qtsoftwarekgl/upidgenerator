const _ = require('lodash')
const fs = require('fs')
const BaseController = require('../base/controller')
const CitizenResponse = require('./citizenResponse')
const { SUCCESS, ERROR, ER_CONFLICT, BAD_REQUEST } = require('../../libs/constants')
const DocumentFactory = require('./documentFactory')
const NidDetails = require('./nidDetails')
const Service = require('./service')

class Controller extends BaseController {
  async getCitizen (req, res) {
    const document = new DocumentFactory().documentBuild(req.body.documentType)
    let data = {}
    if (req.body.documentType === 'OTHERS' || req.body.documentType === 'TEMPID') {
      data = await new Service().findCitizenWithDetails(req.body)
      return this.sendResponse(req, res, SUCCESS.CODE, { data })
    }

    if (req.body.documentType !== 'TEMPID' && req.body.documentType !== 'PASSPORT' && req.body.documentType !== 'FOREIGNER_ID') {
      data = await document.getCititzen(req, res)
    }

    if (data) {
      let result
      if (_.isArray(data)) {
        result = _.map(data, o =>
          new CitizenResponse().build(o)
        )
      } else {
        result = new CitizenResponse().build(data)
      }
      let results
      if (req.body.documentType !== 'UPI' && req.body.documentType !== 'OTHERS') {
        if (!_.isArray(result)) {
          result.documentType = req.body.documentType
          if (req.body.documentType === 'TEMPID') {
            result.documentNumber = result.documentNumber ? result.documentNumber : req.body.documentNumber
          }
          result.fosaid = req.body && req.body.fosaid ? req.body.fosaid : 'SITE'
          const upiItem = await new NidDetails().putCitizenDetails(result)
          results = result
          // console.log(upiItem)
          if (upiItem && upiItem.documentNumber) {
            results.upi = upiItem.documentNumber
          }
        }
      } else {
        results = result
      }
      this.sendResponse(req, res, SUCCESS.CODE, { data: results })
    } else {
      this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.no_records_found' })
    }
  }

  async base64ToImage (req, res) {
    const documentType = req.body.documentType
    const documentNumber = req.body.documentNumber
    const base64Image = req.body.baseImage
    const localPath = 'uploads'
    const prefix = '/users/'
    const filename = `${documentType}_${documentNumber}.jpg`
    if (!fs.existsSync(localPath)) {
      fs.mkdirSync(localPath)
    }

    if (!fs.existsSync(localPath)) {
      fs.mkdirSync(localPath)
    }

    fs.writeFileSync(`${localPath}${prefix}${filename}`, base64Image, 'base64')
    this.sendResponse(req, res, SUCCESS.CODE, { data: { filename: `${prefix}${filename}` } })
  }

  async asyncForEach (array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  async syncPatient (req, res) {
    if (req.body && req.body.length === 0) {
      this.sendResponse(req, res, BAD_REQUEST.CODE, { message: 'Empty body', status: 'BAD_REQUEST' })
    }

    if (req.body && req.body.length > 1) {
      this.sendResponse(req, res, BAD_REQUEST.CODE, { message: 'For now request support for only one object. Please try one by one', status: 'BAD_REQUEST' })
    }
    try {
      const result = await new Service().syncPatient(req.body)
      if (result && result.length && result[0]._id) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Success' })
      } else if (result && result.responseCode === ER_CONFLICT.CODE) {
        this.sendResponse(req, res, ER_CONFLICT.CODE, result)
      } else {
        if (result.code === 11000) {
          this.sendResponse(req, res, ERROR.CODE, { message: 'UPID duplication error ' + result.writeErrors[0].errmsg })
        } else {
          this.sendResponse(req, res, ERROR.CODE, { message: 'Error' })
        }
      }
    } catch (error) {
      console.log('syncPatient error', error)
      this.sendResponse(req, res, BAD_REQUEST.CODE, { message: 'Please check the request data', status: 'BAD_REQUEST' })
    }
  }
}

module.exports = Controller
