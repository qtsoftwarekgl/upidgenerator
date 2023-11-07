const joi = require('@hapi/joi')

const getCitizen = joi.object().keys({
  documentType: joi.string().valid('NID', 'NID_APPLICATION_NUMBER', 'NIN', 'OTHERS', 'PASSPORT', 'UPI', 'TEMPID', 'FOREIGNER_ID').required(),
  documentNumber: joi.string(),
  fosaid: joi.string().allow('', null),
  postNames: joi.string().allow('', null),
  surName: joi.string().allow('', null),
  fatherName: joi.string().allow('', null),
  motherName: joi.string().allow('', null),
  yearOfBirth: joi.string().allow('', null),
  applicationNumber: joi.string().allow('', null),
  tempId: joi.string().allow('', null),
  nin: joi.string().allow('', null),
  nid: joi.string().allow('', null),
  upi: joi.string().allow('', null),
  sex: joi.string().allow('', null),
  dateOfBirth: joi.string().allow('', null),
  villageId: joi.string().allow('', null),
  domicileCountry: joi.string().allow('', null),
  domicileDistrict: joi.string().allow('', null),
  domicileProvince: joi.string().allow('', null),
  domicileSector: joi.string().allow('', null),
  domicileCell: joi.string().allow('', null),
  domicileVillage: joi.string().allow('', null),
  maritalStatus: joi.string().allow('', null),
  citizenStatus: joi.string().allow('', null),
  nationality: joi.string().allow('', null),
  applicantType: joi.string().allow('', null),
  createdAt: joi.string().allow('', null),
  updatedAt: joi.string().allow('', null)
})

const patient = joi.object().keys({
  documentType: joi.string().valid('NID', 'NID_APPLICATION_NUMBER', 'NIN', 'OTHERS', 'PASSPORT', 'UPI', 'TEMPID', 'FOREIGNER_ID').required(),
  documentNumber: joi.string(),
  upi: joi.string().required(),
  fosaid: joi.string().allow('', null),
  tempId: joi.string().allow('', null),
  postNames: joi.string().allow('', null),
  surName: joi.string().allow('', null),
  fatherName: joi.string().allow('', null),
  motherName: joi.string().allow('', null),
  yearOfBirth: joi.string().allow('', null),
  issueNumber: joi.string().allow('', null),
  dateOfIssue: joi.string().allow('', null),
  dateOfExpiry: joi.string().allow('', null),
  placeOfIssue: joi.string().allow('', null),
  applicationNumber: joi.string().allow('', null),
  nin: joi.string().allow('', null),
  nid: joi.string().allow('', null),
  sex: joi.string().required(),
  dateOfBirth: joi.string().allow('', null),
  placeOfBirth: joi.string().allow('', null),
  countryOfBirth: joi.string().allow('', null),
  birthCountry: joi.string().allow('', null),
  villageId: joi.string().allow('', null),
  domicileCountry: joi.string().allow('', null),
  domicileDistrict: joi.string().allow('', null),
  domicileProvince: joi.string().allow('', null),
  domicileSector: joi.string().allow('', null),
  domicileCell: joi.string().allow('', null),
  domicileVillage: joi.string().allow('', null),
  civilStatus: joi.string().allow('', null),
  maritalStatus: joi.string().allow('', null),
  spouse: joi.string().allow('', null),
  citizenStatus: joi.string().allow('', null),
  nationality: joi.string().allow('', null),
  applicantType: joi.string().allow('', null)
})

const syncPatient = joi.array().items(patient)

module.exports = {
  getCitizen,
  syncPatient
}
