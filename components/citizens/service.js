const _ = require('lodash')
const API = require('../../config/axiosConfig')
const { errLogger } = require('../../config/logger')
const {
  KEYPHRASE,
  ER_CONFLICT
} = require('../../libs/constants')
const moment = require('moment')
const Utils = require('../../helpers/utils')
const Schema = require('./schema')
const GenerateUPI = require('./generateUPI')

class Service {
  async getCitizenDetails (req, res, token, url, data) {
    const result = await API.post(url, data, { headers: { Authorization: `${token}` } })
      .catch((err) => {
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
    if (result) {
      result.documentType = 'NID'
      return result
    }
  }

  async getCititzen (req, res) {
    const params = req.body
    const data = Service.formatRequestData(params)
    data.secretKey = process.env.NIDA_SECRET_KEY
    delete data.keyPhrase
    return new Service().getCitizenDetails(req, res, process.env.NIDA_SECRET_KEY, process.env.NIDA_URL, data)
  }

  static formatRequestData (params) {
    let data = {}
    if (params.documentType === 'NID') {
      data = {
        documentNumber: params.documentNumber
      }
    } else if (params.documentType === 'NID_APPLICATION_NUMBER' || params.documentType === 'NIN') {
      data = {
        applicantNumber: params.documentNumber
      }
    } else if (params.documentType === 'OTHERS') {
      data = {
        name: params && params.surName,
        postnames: params && params.postNames,
        yearOfBirth: params && params.yearOfBirth
      }
    }

    return { ...data, ...{ keyPhrase: KEYPHRASE } }
  }

  async save (params) {
    const data = new Schema(params)
    return data.save().catch((e) => {
      errLogger.error(e)
      console.log(e)
    })
  }

  async checkUPIValidation (userData) {
    let checkUPI = 0
    if (_.isUndefined(userData.upi) || (!_.isUndefined(userData.upi) && (userData.upi !== '' || userData.upi !== null))) {
      checkUPI = 1
    } else {
      let showDetails = 0
      const upiCount = await Schema.find().where({ documentNumber: userData.upi }).countDocuments().lean().exec()
      if (upiCount > 0) {
        const upiDetails = await Schema.where({ documentNumber: userData.upi }).select('-_id -logs -createdAt -updatedAt').lean().exec()
        if (userData.documentType === 'NID') {
          if (upiDetails[0].nid === userData.documentNumber) {
            showDetails = 1
          }
        } else if (userData.documentType === 'NID_APPLICATION_NUMBER') {
          if (upiDetails[0].applicationNumber === userData.documentNumber) {
            showDetails = 1
          }
        } else if (userData.documentType === 'PASSPORT') {
          if (upiDetails[0].passportNumber === userData.documentNumber) {
            showDetails = 1
          }
        } else if (userData.documentType === 'UNHCR_REFUGEE_NUMBER') {
          if (upiDetails[0].refugeeNumber === userData.documentNumber) {
            showDetails = 1
          }
        } else if (userData.documentType === 'TEMPID') {
          if (upiDetails[0].tempId === userData.documentNumber) {
            showDetails = 1
          }
        } else if (userData.documentType === 'FOREIGNER_ID') {
          if (upiDetails[0].tempId === userData.documentNumber) {
            showDetails = 1
          }
        }
        if (showDetails === 1) {
          const data = await new Service().formatData(upiDetails[0])
          return data
        } else {
          return false
        }
      } else {
        return false
      }
    }
    if (checkUPI === 1) {
      let saveData = 0
      if (userData.documentType !== '') {
        const upiMatch = {}
        if (userData.documentType === 'NID' || userData.documentType === 'NID_APPLICATION_NUMBER' || userData.documentType === 'NIN') {
          if (userData.documentNumber !== '' && userData.applicationNumber !== '') {
            upiMatch.$or = [{ nid: userData.documentNumber }, { applicationNumber: userData.applicationNumber }]
          } else if (userData.documentNumber !== '') {
            upiMatch.nid = userData.documentNumber
          } else if (userData.applicationNumber !== '') {
            upiMatch.applicationNumber = userData.applicationNumber
          }
          userData.nid = userData.documentNumber
        } else if (userData.documentType === 'PASSPORT') {
          upiMatch.passportNumber = userData.documentNumber
          userData.passportNumber = userData.documentNumber
        } else if (userData.documentType === 'UNHCR_REFUGEE_NUMBER') {
          upiMatch.refugeeNumber = userData.documentNumber
          userData.refugeeNumber = userData.documentNumber
        } else if (userData.documentType === 'TEMPID') {
          upiMatch.tempId = userData.documentNumber
          userData.tempId = userData.documentNumber
        } else if (userData.documentType === 'FOREIGNER_ID') {
          upiMatch.foreignerId = userData.documentNumber
          userData.foreignerId = userData.documentNumber
        }
        if (!_.isEmpty(upiMatch)) {
          const upiQuery = Schema.find().where(upiMatch)
          const upiCounts = await upiQuery.countDocuments().lean().exec()
          if (upiCounts > 0) {
            const details = await Schema.find().where(upiMatch).select('-_id -logs -createdAt -updatedAt').lean().exec()
            const data = await new Service().formatData(details[0])
            return data
          } else {
            saveData = 1
          }
        } else {
          saveData = 1
        }
      } else {
        saveData = 1
      }

      if (saveData === 1) {
        if (userData.documentType === 'NID' || userData.documentType === 'NID_APPLICATION_NUMBER' || userData.documentType === 'NIN') {
          userData.nid = userData.documentNumber
        } else if (userData.documentType === 'UPI') {
          userData.upi = userData.documentNumber
        } else if (userData.documentType === 'PASSPORT') {
          userData.passportNumber = userData.documentNumber
        } else if (userData.documentType === 'UNHCR_REFUGEE_NUMBER') {
          userData.refugeeNumber = userData.documentNumber
        } else if (userData.documentType === 'TEMPID') {
          userData.tempId = userData.documentNumber
        }
        // userData.documentType = 'UPI'
        const generatedRandomUpi = await new GenerateUPI().generateUPI() // SAMPLE->(YYMMDD)220726-random4digits
        const generatedUpiNumber = generatedRandomUpi.split('-')
        userData.documentNumber = generatedUpiNumber[0] + '-' + (userData && userData.fosaid ? userData.fosaid : '') + '-' + generatedUpiNumber[1]

        userData.dateOfBirth = userData.dateOfBirth ? moment(userData.dateOfBirth, 'DD/MM/YYYY').format('YYYY-MM-DD') : ''
        if (!_.isUndefined(userData.dateOfExpiry) && userData.dateOfExpiry !== '' && userData.dateOfExpiry !== null) {
          userData.dateOfExpiry = moment(userData.dateOfExpiry, 'DD/MM/YYYY').format('YYYY-MM-DD')
        } else {
          delete userData.dateOfExpiry
        }
        const saveData = await new Service().save(userData)
        const details = await Schema.find().where({ _id: saveData._id }).select('-_id -logs -updatedAt').lean().exec()
        const data = await new Service().formatData(details[0])
        return data
      }
    }
  }

  async update (query, updateParams) {
    return Schema.updateOne(query, updateParams).catch((e) => {
      errLogger.error(e)
    })
  }

  async getUPI (inputData) {
    var upiSearch = {}
    if (inputData.documentNumber) {
      const reverseUPI = await new Service().reverseFormatUPI(inputData.documentNumber)
      upiSearch.documentNumber = reverseUPI
    }
    if (inputData.surName) {
      upiSearch.surName = new RegExp(inputData.surName, 'i')
    }
    if (inputData.postNames) {
      upiSearch.postNames = new RegExp(inputData.postNames, 'i')
    }
    if (inputData.fatherName) {
      upiSearch.fatherName = new RegExp(inputData.fatherName, 'i')
    }
    if (inputData.motherName) {
      upiSearch.motherName = new RegExp(inputData.motherName, 'i')
    }
    const details = await Schema.find(upiSearch)
    if (details.length > 0) {
      const upiDetails = []
      await new Service().asyncForEach(details, async function (item) {
        item = await new Service().formatData(item)
        upiDetails.push(item)
      })
      return upiDetails.length === 1 ? upiDetails[0] : upiDetails
    } else {
      return false
    }
  }

  async get (upi) {
    var upiSearch = {}
    if (!_.isUndefined(upi) && upi !== '') {
      const reverseUPI = await new Service().reverseFormatUPI(upi)
      upiSearch.documentNumber = reverseUPI
      const details = await Schema.find().where(upiSearch).select('-logs -createdAt -updatedAt').lean().exec()
      if (details.length > 0) {
        const upiDetails = []
        await new Service().asyncForEach(details, async function (item) {
          item = await new Service().formatData(item)
          upiDetails.push(item)
        })
        return upiDetails.length === 1 ? upiDetails[0] : upiDetails
      }
    }
    return false
  }

  async formatData (data) {
    data.documentNumber = await new Service().formatUPI(data.documentNumber)
    if (data.dateOfExpiry !== '') {
      data.dateOfExpiry = moment(data.dateOfExpiry).format('DD/MM/YYYY')
    }
    data.dateOfIssue = moment(data.createdAt).format('DD/MM/YYYY')
    delete data.createdAt
    return data
  }

  async formatUPI (num) {
    return num
    // return num.substring(0, 3) + '-' + num.substring(3, 7) + '-' + num.substring(7, 10)
  }

  async reverseFormatUPI (num) {
    return num
    // return num.split('-').join('')
  }

  async asyncForEach (array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  async getUPIByApplicationNumber (data) {
    return Schema.findOne(data).select('applicationNumber documentNumber').lean().catch((e) => {
      errLogger.error(e)
    })
  }

  async syncPatient (data) {
    const formatData = await new Utils().formatSyncPatient(data)
    const upiSearch = {}
    upiSearch.documentNumber = formatData[0].documentNumber

    // get the patient by the upid
    const patients = await this.validateUPID(upiSearch)

    /**
     * check the surname matches with new patient
     * if matches just return success
     * if not then return the conflict error {@link ER_CONFLICT }
     */
    if (patients && patients.length > 0) {
      const patient = patients[0]
      var dob = patient.dateOfBirth ? moment(patient.dateOfBirth, 'DD/MM/YYYY').format('YYYY-MM-DD') : ''
      console.info('FOUND THE DUPLICATION FOR=>', formatData)
      if (this.equalsIgnoringCase(patient.surName ? patient.surName : '', formatData[0].surName) && this.equalsIgnoringCase(patient.postNames ? patient.postNames : '', formatData[0].postNames) && dob === formatData[0].dateOfBirth) {
        return patients
      } else {
        const nameData = await this.checkSameNameForPatient(formatData)
        if (nameData && nameData !== '') {
          return nameData
        }
        formatData[0] = await this.generateNewUPIAndSet(formatData[0])
        await Schema.insertMany(formatData).catch((e) => {
          console.log('***** syncPatient Error *****', e)
          errLogger.error(e)
          return e
        })

        return this.buildConflictResponse(formatData[0].upi)
      }
    }
    const nameData = await this.checkSameNameForPatient(formatData)
    if (nameData && nameData !== '') {
      return nameData
    }
    return await Schema.insertMany(formatData).catch((e) => {
      console.log('***** syncPatient Error *****', e)
      errLogger.error(e)
      return e
    })
  }

  equalsIgnoringCase (text, other) {
    return text.trim().localeCompare(other.trim(), undefined, { sensitivity: 'base' }) === 0
  }

  async findCitizenWithDetails (detailsToSearch) {
    const upi = detailsToSearch.upi
    const fosaid = detailsToSearch.fosaid

    delete detailsToSearch.upi
    delete detailsToSearch.fosaid

    if (detailsToSearch.sex) {
      detailsToSearch.sex = detailsToSearch.sex === 'M' ? 'MALE' : detailsToSearch.sex === 'F' ? 'FEMALE' : detailsToSearch.sex
    }

    if (detailsToSearch.dateOfBirth) {
      detailsToSearch.dateOfBirth = new Date(detailsToSearch.dateOfBirth)
    }

    let data = await this.validateUPID(detailsToSearch)

    if (data.length === 0) {
      data = {}

      data.fosaid = fosaid
      data.documentType = detailsToSearch.documentType ? detailsToSearch.documentType : ''
      data.documentNumber = detailsToSearch.documentNumber ? detailsToSearch.documentNumber : ''
      data.issueNumber = detailsToSearch.issueNumber ? detailsToSearch.issueNumber : ''
      data.dateOfIssue = detailsToSearch.dateOfIssue ? detailsToSearch.dateOfIssue : ''
      data.dateOfExpiry = detailsToSearch.dateOfExpiry ? detailsToSearch.dateOfExpiry : ''
      data.placeOfIssue = detailsToSearch.placeOfIssue ? detailsToSearch.placeOfIssue : ''
      data.applicationNumber = detailsToSearch.applicationNumber ? detailsToSearch.applicationNumber : ''
      data.nin = detailsToSearch.nin ? detailsToSearch.nin : ''
      data.nid = detailsToSearch.nid ? detailsToSearch.nid : ''
      data.upi = detailsToSearch.upi ? detailsToSearch.upi : ''
      data.surName = detailsToSearch.surName ? detailsToSearch.surName : ''
      data.postNames = detailsToSearch.postNames ? detailsToSearch.postNames : ''
      data.fatherName = detailsToSearch.fatherName ? detailsToSearch.fatherName : ''
      data.motherName = detailsToSearch.motherName ? detailsToSearch.motherName : ''
      if (detailsToSearch.sex) {
        data.sex = detailsToSearch.sex
      }

      if (detailsToSearch.dateOfBirth) {
        data.dateOfBirth = detailsToSearch.dateOfBirth
      }
      data.placeOfBirth = detailsToSearch.placeOfBirth ? detailsToSearch.placeOfBirth : ''
      data.countryOfBirth = detailsToSearch.countryOfBirth ? detailsToSearch.countryOfBirth : ''
      data.birthCountry = detailsToSearch.birthCountry ? detailsToSearch.birthCountry : ''
      data.villageId = detailsToSearch.villageId ? detailsToSearch.villageId : ''
      data.domicileCountry = detailsToSearch.domicileCountry ? detailsToSearch.domicileCountry : ''
      data.domicileDistrict = detailsToSearch.domicileDistrict ? detailsToSearch.domicileDistrict : ''
      data.domicileProvince = detailsToSearch.domicileProvince ? detailsToSearch.domicileProvince : ''
      data.domicileSector = detailsToSearch.domicileSector ? detailsToSearch.domicileSector : ''
      data.domicileCell = detailsToSearch.domicileCell ? detailsToSearch.domicileCell : ''
      data.domicileVillage = detailsToSearch.domicileVillage ? detailsToSearch.domicileVillage : ''
      data.civilStatus = detailsToSearch.civilStatus ? detailsToSearch.civilStatus : ''
      data.maritalStatus = detailsToSearch.maritalStatus ? detailsToSearch.maritalStatus : ''
      data.spouse = detailsToSearch.spouse ? detailsToSearch.spouse : ''
      data.photo = detailsToSearch.photo ? detailsToSearch.photo : ''
      data.citizenStatus = detailsToSearch.citizenStatus ? detailsToSearch.citizenStatus : ''
      data.nationality = detailsToSearch.nationality ? detailsToSearch.nationality : ''
      data.applicantType = detailsToSearch.applicantType ? detailsToSearch.applicantType : ''

      const ct = await this.generateNewUPIAndSet(data)
      await new Service().save(ct)
      ct.dateOfBirth = moment(ct.dateOfBirth).format('YYYY-MM-DD')
      return ct
    }

    if (data.length > 0) {
      data[0].upi = upi
      data[0].fosaid = fosaid
      delete data[0].logs
      delete data[0].createdAt
      delete data[0].updatedAt
      delete data[0]._id
    }

    return data.length > 0 ? data[0] : {}
  }

  async checkSameNameForPatient (formatData) {
    var upiSearch = {}
    upiSearch.surName = formatData[0].surName.trim()
    upiSearch.postNames = formatData[0].postNames.trim()
    upiSearch.dateOfBirth = new Date(formatData[0].dateOfBirth.trim())
    const getByNamesResults = await this.validateUPID(upiSearch)
    if (getByNamesResults && getByNamesResults.length > 0) {
      return this.buildConflictResponse(getByNamesResults[0].documentNumber)
    }

    return ''
  }

  buildConflictResponse (upi) {
    const result = {}
    result.upi = upi
    result.responseCode = ER_CONFLICT.CODE
    result.status = ER_CONFLICT.MSG
    result.message = ER_CONFLICT.INVALID_RESPONSE
    return result
  }

  /**
   * get the patient by upid or with given field name
   * @param data
   * @returns {Promise<unknown[]>}
   */
  async validateUPID (data) {
    return await Schema.find().where(data).lean().exec()
  }

  async generateNewUPIAndSet (data) {
    const generatedRandomUpi = await new GenerateUPI().generateUPI() // SAMPLE->(YYMMDD)220726-random4digits
    const generatedUpiNumber = generatedRandomUpi.split('-')
    const upi = generatedUpiNumber[0] + '-' + (data && data.fosaid ? data.fosaid : '') + '-' + generatedUpiNumber[1]
    data.documentNumber = upi
    data.upi = upi
    return data
  }
}

module.exports = Service
