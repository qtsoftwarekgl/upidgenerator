module.exports = {
  create: {
    required: [
      'module',
      'status'
    ],
    properties: {
      module: {
        type: 'string',
        enum: ['BIRTH', 'DEATH', 'USER_SETTINGS', 'GENERAL_SETTINGS']
      },
      status: {
        type: 'string',
        enum: ['ON', 'OFF']
      }
    }
  },
  properties: {
    module: {
      type: 'string',
      enum: ['BIRTH', 'DEATH', 'USER_SETTINGS', 'GENERAL_SETTINGS']
    },
    status: {
      type: 'string',
      enum: ['ON', 'OFF']
    }
  }
}
