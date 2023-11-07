module.exports = {
  create: {
    required: [
      'documentType',
      'documentNumber',
      'surName',
      'postNames',
      'dateOfBirth',
      'maritalStatus',
      'sex',
      'nationality',
      'domicileCountry',
      'domicileDistrict',
      'domicileProvince',
      'domicileSector',
      'domicileCell',
      'domicileVillage',
      'photo',
      'phoneNumber',
      'email',
      'role',
      'accessType',
      'ministry',
      'facilityId',
      'facilityName',
      'facilityType',
      'facilityArea'
    ],
    properties: {
      documentType: {
        type: 'string'
      },
      documentNumber: {
        type: 'string'
      },
      surName: {
        type: 'string'
      },
      postNames: {
        type: 'string'
      },
      dateOfBirth: {
        type: 'string'
      },
      maritalStatus: {
        type: 'string'
      },
      sex: {
        type: 'string',
        enum: ['MALE', 'FEMALE']
      },
      nationality: {
        type: 'string'
      },
      domicileCountry: {
        type: 'string'
      },
      domicileDistrict: {
        type: 'string'
      },
      domicileProvince: {
        type: 'string'
      },
      domicileSector: {
        type: 'string'
      },
      domicileCell: {
        type: 'string'
      },
      domicileVillage: {
        type: 'string'
      },
      photo: {
        type: 'string'
      },
      phoneNumber: {
        type: 'string'
      },
      email: {
        type: 'string'
      },
      status: {
        type: 'string',
        default: 'ACTIVE',
        enum: ['ACTIVE', 'INACTIVE', 'DELETED']
      },
      role: {
        type: 'string',
        enum: ['CR', 'NOTIFIER', 'MINISTRY_ADMIN', 'LAUNCHER', 'SUPER_ADMIN', 'SECONDARY_ADMIN']
      },
      accessType: {
        type: 'string'
      },
      position: {
        type: 'string'
      },
      institutionName: {
        type: 'string'
      },
      ministry: {
        type: 'string',
        enum: ['MOH', 'MINAFFET', 'MINALOC']
      },
      residentialCountry: {
        type: 'string'
      },
      residentialDistrict: {
        type: 'string'
      },
      residentialProvince: {
        type: 'string'
      },
      residentialSector: {
        type: 'string'
      },
      residentialCell: {
        type: 'string'
      },
      residentialVillage: {
        type: 'string'
      },
      facilityType: {
        type: 'string'
      },
      facilityArea: {
        type: 'string'
      },
      facilityId: {
        type: 'string'
      },
      facilityName: {
        type: 'string'
      },
      vitalStatus: {
        type: 'string'
      }
    }
  },
  deactivateDeceased: {
    properties: {
      documentNumber: {
        type: 'string'
      },
      approvedBy: {
        type: 'string'
      },
      dateOfDeath: {
        type: 'string'
      }
    }
  },
  update: {
    properties: {
      documentType: {
        type: 'string'
      },
      documentNumber: {
        type: 'string'
      },
      surName: {
        type: 'string'
      },
      postNames: {
        type: 'string'
      },
      dateOfBirth: {
        type: 'string'
      },
      maritalStatus: {
        type: 'string'
      },
      sex: {
        type: 'string',
        enum: ['MALE', 'FEMALE']
      },
      nationality: {
        type: 'string'
      },
      domicileCountry: {
        type: 'string'
      },
      domicileDistrict: {
        type: 'string'
      },
      domicileProvince: {
        type: 'string'
      },
      domicileSector: {
        type: 'string'
      },
      domicileCell: {
        type: 'string'
      },
      domicileVillage: {
        type: 'string'
      },
      photo: {
        type: 'string'
      },
      phoneNumber: {
        type: 'string'
      },
      email: {
        type: 'string'
      },
      status: {
        type: 'string',
        default: 'ACTIVE',
        enum: ['ACTIVE', 'INACTIVE', 'DELETED']
      },
      role: {
        type: 'string',
        enum: ['CR', 'NOTIFIER', 'MINISTRY_ADMIN', 'LAUNCHER', 'SUPER_ADMIN', 'SECONDARY_ADMIN']
      },
      position: {
        type: 'string'
      },
      accessType: {
        type: 'string'
      },
      institutionName: {
        type: 'string'
      },
      ministry: {
        type: 'string',
        enum: ['MOH', 'MINAFFET', 'MINALOC']
      },
      residentialCountry: {
        type: 'string'
      },
      residentialDistrict: {
        type: 'string'
      },
      residentialProvince: {
        type: 'string'
      },
      residentialSector: {
        type: 'string'
      },
      residentialCell: {
        type: 'string'
      },
      residentialVillage: {
        type: 'string'
      },
      facilityType: {
        type: 'string'
      },
      facilityArea: {
        type: 'string'
      },
      facilityId: {
        type: 'string'
      },
      facilityName: {
        type: 'string'
      }
    }
  },
  deleteByIds: {
    properties: {
      ids: {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    }
  },
  properties: {
    documentType: {
      type: 'string'
    },
    approvedBy: {
      type: 'string'
    },
    documentNumber: {
      type: 'string'
    },
    surName: {
      type: 'string'
    },
    postNames: {
      type: 'string'
    },
    dateOfBirth: {
      type: 'string'
    },
    maritalStatus: {
      type: 'string'
    },
    sex: {
      type: 'string',
      enum: ['MALE', 'FEMALE']
    },
    nationality: {
      type: 'string'
    },
    domicileCountry: {
      type: 'string'
    },
    domicileDistrict: {
      type: 'string'
    },
    domicileProvince: {
      type: 'string'
    },
    domicileSector: {
      type: 'string'
    },
    domicileCell: {
      type: 'string'
    },
    domicileVillage: {
      type: 'string'
    },
    photo: {
      type: 'string'
    },
    phoneNumber: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    status: {
      type: 'string',
      default: 'ACTIVE',
      enum: ['ACTIVE', 'INACTIVE', 'DELETED']
    },
    role: {
      type: 'string',
      enum: ['CR', 'NOTIFIER', 'MINISTRY_ADMIN', 'LAUNCHER', 'SUPER_ADMIN', 'SECONDARY_ADMIN']
    },
    accessType: {
      type: 'string'
    },
    position: {
      type: 'string'
    },
    institutionName: {
      type: 'string'
    },
    ministry: {
      type: 'string',
      enum: ['MOH', 'MINAFFET', 'MINALOC']
    },
    residentialCountry: {
      type: 'string'
    },
    residentialDistrict: {
      type: 'string'
    },
    residentialProvince: {
      type: 'string'
    },
    residentialSector: {
      type: 'string'
    },
    residentialCell: {
      type: 'string'
    },
    residentialVillage: {
      type: 'string'
    },
    facilityType: {
      type: 'string'
    },
    facilityArea: {
      type: 'string'
    },
    facilityId: {
      type: 'string'
    },
    facilityName: {
      type: 'string'
    },
    vitalStatus: {
      type: 'string'
    }
  }
}
