module.exports = {
  getDetails: {
    required: [
      'documentType'
    ],
    properties: {
      documentType: {
        type: 'string',
        default: 'NID',
        enum: ['NID', 'NID_APPLICATION_NUMBER', 'OTHERS', 'PASSPORT']
      },
      documentNumber: {
        type: 'string',
        example: '1197480080397070'
      },
      postNames: {
        type: 'string'
      },
      surName: {
        type: 'string'
      },
      fatherName: {
        type: 'string'
      },
      motherName: {
        type: 'string'
      },
      yearOfBirth: {
        type: 'string'
      }
    }
  },
  convertToImage: {
    required: [
      'documentType',
      'documentNumber',
      'baseImage'
    ],
    properties: {
      documentType: {
        type: 'string',
        default: 'NID',
        enum: ['NID', 'NID_APPLICATION_NUMBER', 'OTHERS', 'PASSPORT']
      },
      documentNumber: {
        type: 'string',
        example: '1197480080397070'
      },
      baseImage: {
        type: 'string'
      }
    }
  }
}
