const _ = require('lodash')
const API = require('../../config/axiosConfig')
const { errLogger } = require('../../config/logger')
const { URLS, SUCCESS } = require('../../libs/constants')
const Service = require('./service')

class UPIDetails {
  async getCititzen (req, res) {
    const data = await new UPIDetails().getCitizenUPIDetails(req.body, res)
    if (data && data.status === SUCCESS.MSG) {
      return data.data
    } else if (data) {
      return data
    } else {
      return false
    }
  }

  async getCitizenUPIDetails (params, res) {
    const data = UPIDetails.formatRequestData(params)
    let upiData = null
    if (params.documentType === 'UPI') {
      upiData = await new Service().getUPI(data)
      return upiData
    } else {
      upiData = await API.post(`${URLS[params.documentType]}`, data).catch((err) => {
        errLogger.error(err.response)
        let msg
        if ((err && _.isUndefined(err.response)) || (err && err.response && err.response.status && _.includes([504, 500, 502], err.response.status))) {
          msg = 'server_error.NID_service_unavailable_!'
        } else {
          msg = 'server_error.No_record(s)_found'
        }
        const code = err && err.response && err.response.status ? err.response.status : 503
        res.json({ code: code, status: 'error', message: msg })
      })
    }

    if (upiData && upiData.status === 'ok') {
      return upiData
    } else {
      res.json({ code: 404, status: 'error', message: 'server_error.no_records_found' })
    }
  }

  async putCitizenDetails (data) {
    return await new Service().checkUPIValidation(data).catch((err) => {
      errLogger.error(err)
    })
  }

  static formatRequestData (params) {
    params.postNames = params.postName
    delete params.postName
    return params
  }
}

module.exports = UPIDetails
