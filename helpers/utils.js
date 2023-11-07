class Utils {
  async formatSyncPatient (data) {
    if (data && data.length) {
      const formatData = []
      await data.forEach((item) => {
        const row = {}
        var gender = item.sex ? item.sex : ''
        if (item.sex) {
          if (item.sex === 'M') {
            gender = 'MALE'
          }
          if (item.sex === 'F') {
            gender = 'FEMALE'
          }
        }
        row.documentNumber = item.upi
        row.fosaid = item.fosaid
        row.documentType = item.documentType
        row.surName = item.surName ? item.surName : ''
        row.postNames = item.postNames ? item.postNames : ''
        row.fatherName = item.fatherName ? item.fatherName : ''
        row.motherName = item.motherName ? item.motherName : ''
        row.issueNumber = item.issueNumber ? item.issueNumber : ''
        row.dateOfIssue = item.postNames ? item.dateOfIssue : ''
        row.dateOfExpiry = item.dateOfExpiry ? item.dateOfExpiry : ''
        row.placeOfIssue = item.placeOfIssue ? item.placeOfIssue : ''
        row.applicationNumber = item.applicationNumber ? item.applicationNumber : ''
        row.nin = item.nin ? item.nin : ''
        row.nid = item.nid ? item.nid : ''
        row.upi = item.upi ? item.upi : ''
        row.tempId = item.tempId ? item.tempId : ''
        row.sex = gender
        row.dateOfBirth = item.dateOfBirth ? item.dateOfBirth : ''
        row.placeOfBirth = item.placeOfBirth ? item.placeOfBirth : ''
        row.countryOfBirth = item.countryOfBirth ? item.countryOfBirth : ''
        row.birthCountry = item.birthCountry ? item.birthCountry : ''
        row.villageId = item.villageId ? item.villageId : ''
        row.domicileCountry = item.domicileCountry ? item.domicileCountry : ''
        row.domicileDistrict = item.domicileDistrict ? item.domicileDistrict : ''
        row.domicileProvince = item.domicileProvince ? item.domicileProvince : ''
        row.domicileSector = item.domicileSector ? item.domicileSector : ''
        row.domicileCell = item.domicileCell ? item.domicileCell : ''
        row.domicileVillage = item.domicileVillage ? item.domicileVillage : ''
        row.civilStatus = item.civilStatus ? item.civilStatus : ''
        row.maritalStatus = item.maritalStatus ? item.maritalStatus : ''
        row.spouse = item.spouse ? item.spouse : ''
        row.citizenStatus = item.citizenStatus ? item.citizenStatus : ''
        row.nationality = item.nationality ? item.nationality : ''
        row.applicantType = item.applicantType ? item.applicantType : ''
        if (item.documentType === 'NID') {
          row.nid = item.documentNumber
        } else if (item.documentType === 'NIN') {
          row.nin = item.documentNumber
        } else if (item.documentType === 'NID_APPLICATION_NUMBER') {
          row.applicationNumber = item.documentNumber
        } else if (item.documentType === 'PASSPORT') {
          row.passportNumber = item.documentNumber
        } else if (item.documentType === 'UPI') {
          row.upi = item.documentNumber
        } else if (item.documentType === 'FOREIGNER_ID') {
          row.foreignerId = item.documentNumber
        }
        formatData.push(row)
      })
      return formatData
    }
  }
}

module.exports = Utils
