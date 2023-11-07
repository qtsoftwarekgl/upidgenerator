const fs = require('fs')

class CitizenResponse {
  build (citizenDetails) {
    return {
      documentType: citizenDetails.documentType,
      documentNumber: citizenDetails.documentNumber ? citizenDetails.documentNumber.replace(/\s/g, '') : '',
      issueNumber: citizenDetails.issueNumber,
      dateOfIssue: citizenDetails.dateOfIssue,
      dateOfExpiry: citizenDetails.dateOfExpiry,
      placeOfIssue: citizenDetails.placeOfIssue,
      applicationNumber: citizenDetails.applicationNumber,
      nin: citizenDetails.nin || '',
      nid: citizenDetails.documentNumber || '',
      upi: citizenDetails.documentType === 'UPI' ? citizenDetails.documentNumber : '',
      nid: (citizenDetails.documentType === 'NID') ? ((citizenDetails.documentNumber != null) ? citizenDetails.documentNumber.replace(/\s/g, '') : '') : citizenDetails.nid,
      passportNumber: citizenDetails.documentType === 'PASSPORT' ? citizenDetails.documentNumber : citizenDetails.passportNumber,
      refugeeNumber: citizenDetails.documentType === 'UNHCR_REFUGEE_NUMBER' ? citizenDetails.documentNumber : citizenDetails.refugeeNumber,
      surName: citizenDetails.surnames || citizenDetails.surName,
      postNames: citizenDetails.foreName || citizenDetails.postNames || citizenDetails.postnames,
      fatherName: citizenDetails.fatherNames || citizenDetails.fatherName,
      motherName: citizenDetails.motherNames || citizenDetails.motherName,
      sex: CitizenResponse.formatGender(citizenDetails.sex || citizenDetails.genderId),
      dateOfBirth: citizenDetails.dateOfBirth,
      placeOfBirth: citizenDetails.placeOfBirth,
      countryOfBirth: citizenDetails.countryOfBirth,
      birthCountry: citizenDetails.birthCountry,
      villageId: citizenDetails.villageId,
      domicileCountry: citizenDetails.countryOfDomicile || '',
      domicileDistrict: citizenDetails.district || citizenDetails.domicileDistrict,
      domicileProvince: citizenDetails.province || citizenDetails.domicileProvince,
      domicileSector: citizenDetails.sector || citizenDetails.domicileSector,
      domicileCell: citizenDetails.cell || citizenDetails.domicileCell,
      domicileVillage: citizenDetails.village || citizenDetails.domicileVillage,
      civilStatus: citizenDetails.civilStatus,
      maritalStatus: CitizenResponse.formatMaritalStatus(citizenDetails.maritalStatus),
      spouse: citizenDetails.spouse,
      photo: CitizenResponse.base64ToImage(citizenDetails),
      citizenStatus: citizenDetails.status,
      nationality: citizenDetails.nationality,
      applicantType: citizenDetails.applicantType
    }
  }

  static base64ToImage (citizenDetails) {
    if (citizenDetails && citizenDetails.photo && citizenDetails.documentType && citizenDetails.documentType !== 'UPI') {
      const documentType = citizenDetails.documentType
      const documentNumber = (citizenDetails.documentNumber).replace(/\s/g, '')
      const base64Image = citizenDetails.photo
      const localPath = 'uploads'
      const prefix = '/users/'
      const filename = `${documentType}_${documentNumber}.jpg`
      if (!fs.existsSync(localPath)) {
        fs.mkdirSync(localPath)
      }

      if (!fs.existsSync(`${localPath}${prefix}`)) {
        fs.mkdirSync(`${localPath}${prefix}`)
      }

      fs.writeFileSync(`${localPath}${prefix}${filename}`, base64Image, 'base64')
      return `${prefix}${filename}`
    }

    return citizenDetails.photo
  }

  static formatGender (data) {
    let gender
    if (data === 'M' || data === 'Male' || data === 'MALE') {
      gender = 'MALE'
    } else if (data === 'F' || data === 'Female' || data === 'FEMALE') {
      gender = 'FEMALE'
    }

    return gender
  }

  static formatMaritalStatus (data) {
    // Not sure Widdowed, Maried spellings are intentional or based on NPR response. Keeping it for later verification
    const validStatus = ['SINGLE', 'MARIED', 'MARRIED', 'DIVORCED', 'WIDOWED', 'WIDDOWED']
    let maritalStatus = (data && validStatus.includes(data.toUpperCase())) ? data.toUpperCase() : null
    if (maritalStatus === 'MARIED') { maritalStatus = 'MARRIED' } else if (maritalStatus === 'WIDDOWED') { maritalStatus = 'WIDOWED' }

    return maritalStatus
  }
}

module.exports = CitizenResponse
