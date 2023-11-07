module.exports = {
  create: {
    required: [
      'status',
      'changeStatus',
      'currentStatus',
      'userId'
    ],
    properties: {
      status: {
        type: 'string',
        default: 'UN_APPROVED',
        enum: ['UN_APPROVED', 'APPROVED', 'REJECTED', 'DELETED']
      },
      userId: {
        type: 'string'
      },
      changeStatus: {
        type: 'string'
      },
      currentStatus: {
        type: 'string'
      }
    }
  },
  update: {
    properties: {
      status: {
        type: 'string',
        default: 'UN_APPROVED',
        enum: ['UN_APPROVED', 'APPROVED', 'REJECTED', 'DELETED']
      },
      userId: {
        type: 'string'
      },
      changeStatus: {
        type: 'string'
      },
      currentStatus: {
        type: 'string'
      }
    }
  },
  properties: {
    status: {
      type: 'string',
      default: 'UN_APPROVED',
      enum: ['UN_APPROVED', 'APPROVED', 'REJECTED', 'DELETED']
    },
    userId: {
      type: 'string'
    },
    changeStatus: {
      type: 'string'
    },
    currentStatus: {
      type: 'string'
    }
  }
}
