const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    documentType: {
      type: String,
      trim: true,
      index: true
    },
    documentNumber: {
      type: String,
      trim: true,
      index: true,
      unique: true
    },
    nid: {
      type: String,
      trim: true,
      index: true
    },
    applicationNumber: {
      type: String,
      trim: true,
      index: true
    },
    nin: {
      type: String,
      trim: true,
      index: true
    },
    tempId: {
      type: String,
      trim: true,
      index: true
    },
    foreignerId: {
      type: String,
      trim: true,
      index: true
    },
    passportNumber: {
      type: String,
      trim: true,
      index: true
    },
    refugeeNumber: {
      type: String,
      trim: true,
      index: true
    },
    crvsNo: {
      type: String,
      trim: true
    },
    crvsNoDeath: {
      type: String,
      trim: true
    },
    surName: {
      type: String,
      trim: true
    },
    postNames: {
      type: String,
      trim: true
    },
    dateOfBirth: {
      type: Date,
      trim: true
    },
    maritalStatus: {
      type: String,
      trim: true
    },
    sex: {
      type: String,
      enum: ['MALE', 'FEMALE']
    },
    fatherName: {
      type: String,
      trim: true
    },
    motherName: {
      type: String,
      trim: true
    },
    nationality: {
      type: String,
      trim: true
    },
    placeOfBirth: {
      type: String,
      trim: true
    },
    countryOfBirth: {
      type: String,
      trim: true
    },
    birthCountry: {
      type: String,
      trim: true
    },
    villageId: {
      type: String,
      trim: true
    },
    domicileCountry: {
      type: String,
      trim: true
    },
    domicileDistrict: {
      type: String,
      trim: true
    },
    domicileProvince: {
      type: String,
      trim: true
    },
    domicileSector: {
      type: String,
      trim: true
    },
    domicileCell: {
      type: String,
      trim: true
    },
    domicileVillage: {
      type: String,
      trim: true
    },
    photo: {
      type: String,
      trim: true
    },
    civilStatus: {
      type: String,
      trim: true
    },
    spouse: {
      type: String,
      trim: true
    },
    citizenStatus: {
      type: String,
      trim: true
    },
    applicantType: {
      type: String,
      trim: true
    },
    issueNumber: {
      type: String,
      trim: true
    },
    dateOfExpiry: {
      type: Date,
      trim: true
    },
    placeOfIssue: {
      type: String,
      trim: true
    },
    updatedBy: {
      type: String
    },
    createdBy: {
      type: String,
      trim: true
    },
    logs: {
      type: Array
    },
    status: {
      type: String,
      default: 'ACTIVE',
      enum: ['ACTIVE', 'INACTIVE', 'DELETED']
    },
    dateOfDeath: {
      type: Date,
      trim: true
    }
  },
  { timestamps: true, versionKey: false }
)

schema.index({ documentNumber: 1 }, { name: 'user_documentNumber', unique: true })

const Users = mongoose.model('users', schema)
module.exports = Users
