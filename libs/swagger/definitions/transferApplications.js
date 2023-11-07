module.exports = {
  create: {
    required: [
      'status',
      'currentFacility',
      'appliedFacility',
      'currentFacilityName',
      'appliedFacilityName',
      'role',
      'currentAccessType',
      'appliedAccessType',
      'ministry',
      'transferReason',
      'userId'
    ],
    properties: {
      status: {
        type: 'string',
        default: 'PENDING',
        enum: ['PENDING', 'APPROVED', 'REJECTED', 'DELETED']
      },
      currentAccessType: {
        type: 'string'
      },
      appliedAccessType: {
        type: 'string'
      },
      role: {
        type: 'string'
      },
      ministry: {
        type: 'string'
      },
      currentFacility: {
        type: 'string'
      },
      currentFacilityName: {
        type: 'string'
      },
      appliedFacility: {
        type: 'string'
      },
      appliedFacilityName: {
        type: 'string'
      },
      transferReason: {
        type: 'string'
      },
      userId: {
        type: 'string'
      }
    }
  },
  update: {
    properties: {
      status: {
        type: 'string',
        default: 'PENDING',
        enum: ['PENDING', 'APPROVED', 'REJECTED', 'DELETED']
      },
      currentAccessType: {
        type: 'string'
      },
      appliedAccessType: {
        type: 'string'
      },
      role: {
        type: 'string'
      },
      ministry: {
        type: 'string'
      },
      currentFacility: {
        type: 'string'
      },
      currentFacilityName: {
        type: 'string'
      },
      appliedFacility: {
        type: 'string'
      },
      appliedFacilityName: {
        type: 'string'
      },
      transferReason: {
        type: 'string'
      },
      userId: {
        type: 'string'
      }
    }
  },
  properties: {
    status: {
      type: 'string',
      default: 'PENDING',
      enum: ['PENDING', 'APPROVED', 'REJECTED', 'DELETED']
    },
    currentAccessType: {
      type: 'string'
    },
    appliedAccessType: {
      type: 'string'
    },
    role: {
      type: 'string'
    },
    ministry: {
      type: 'string'
    },
    currentFacility: {
      type: 'string'
    },
    currentFacilityName: {
      type: 'string'
    },
    appliedFacility: {
      type: 'string'
    },
    appliedFacilityName: {
      type: 'string'
    },
    transferReason: {
      type: 'string'
    },
    userId: {
      type: 'string'
    }
  }
}
