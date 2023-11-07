const definitions = require('../libs/swagger/definitions/index')

module.exports = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'CRVS-USER-SERVICES-API',
    description: 'API',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  host: `${process.env.HOST}`,
  basePath: '/api/v1',
  tags: [
    {
      name: 'User Applications',
      description: 'API for User Applications'
    },
    {
      name: 'Users',
      description: 'API for Users'
    },
    {
      name: 'User Citizens',
      description: 'API for Citizens'
    },
    {
      name: 'Transfer Applications',
      description: 'API for Transfer Applications'
    },
    {
      name: 'Transfer Logs',
      description: 'API for Logs'
    },
    {
      name: 'Deactivate Logs',
      description: 'API for User Logs'
    },
    {
      name: 'Work Logs',
      description: 'API for Work Logs'
    },
    {
      name: 'Launcher Settings',
      description: 'API for Launcher Settings'
    }
  ],
  schemes: `${process.env.SCHEMES}`.split(','),
  consumes: ['application/json'],
  produces: ['application/json'],

  paths: {
    '/userApplications': {
      post: {
        tags: ['User Applications'],
        summary: 'Add a new User Application',
        description: 'Add new User Application to CRVS System',
        parameters: [
          {
            name: 'User Application',
            in: 'body',
            schema: {
              $ref: '#/definitions/Request/UserApplication/create'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      get: {
        tags: ['User Applications'],
        parameters: [
          {
            name: 'documentNumber',
            in: 'query',
            description: 'Return list of User Application'
          },
          {
            name: 'name',
            in: 'query',
            description: 'Return list of User Application'
          },
          {
            name: 'phoneNumber',
            in: 'query',
            description: 'Return list of User Application'
          },
          {
            name: 'email',
            in: 'query',
            description: 'Return list of User Application'
          },
          {
            name: 'fromDate',
            in: 'query',
            description: 'Return list of User Application'
          },
          {
            name: 'toDate',
            in: 'query',
            description: 'Return list of User Application'
          },
          {
            name: 'facilityType',
            in: 'query',
            description: 'Return list of User Application'
          },
          {
            name: 'facilityName',
            in: 'query',
            description: 'Return list of User Application'
          },
          {
            name: 'status',
            in: 'query',
            description: 'Return Based on User Application status',
            type: 'string',
            enum: ['PENDING', 'APPROVED', 'REJECTED', 'DELETED']
          },
          {
            name: 'skipPagination',
            in: 'query',
            description: 'Return all records',
            type: 'string',
            default: 'false',
            enum: ['true', 'false']
          },
          {
            name: 'page',
            in: 'query',
            type: 'number',
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        summary: 'Return list of User Application',
        description: 'Returns list of User Application from CRVS System',
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/userapplications/{id}': {
      get: {
        tags: ['User Applications'],
        summary: 'Find user application by ID',
        description: 'Returns a single user application',
        operationId: 'getUAById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return single user application data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      put: {
        tags: ['User Applications'],
        summary: 'Update user application by ID',
        description: 'Update single user application data',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Update single user application data',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'name',
            schema: {
              $ref: '#/definitions/Request/UserApplication/update'
            }
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      delete: {
        tags: ['User Applications'],
        summary: 'Delete user application by ID',
        description: 'Delete single user application data',
        operationId: 'deleteUAById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Delete single user application data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/userapplications/count': {
      get: {
        tags: ['User Applications'],
        summary: 'Find user application count',
        description: 'Returns user application count',
        parameters: [
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/users': {
      post: {
        tags: ['Users'],
        summary: 'Add a new User',
        description: 'Add new User to CRVS System',
        parameters: [
          {
            name: 'User',
            in: 'body',
            schema: {
              $ref: '#/definitions/Request/User/create'
            }
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      get: {
        tags: ['Users'],
        parameters: [
          {
            name: 'documentNumber',
            in: 'query',
            description: 'Return list of User Application'
          },
          {
            name: 'accessType',
            in: 'query',
            description: 'Return list of User Application'
          },
          {
            name: 'name',
            in: 'query',
            description: 'Return list of User Application'
          },
          {
            name: 'phoneNumber',
            in: 'query',
            description: 'Return list of User Application'
          },
          {
            name: 'email',
            in: 'query',
            description: 'Return list of User Application'
          },
          {
            name: 'fromDate',
            in: 'query',
            description: 'Return list of User Application'
          },
          {
            name: 'toDate',
            in: 'query',
            description: 'Return list of User Application'
          },
          {
            name: 'role',
            in: 'query',
            description: 'Return list of User Application'
          },
          {
            name: 'ministry',
            in: 'query',
            description: 'Return list of User Application'
          },
          {
            name: 'facilityType',
            in: 'query',
            description: 'Return list of User Application'
          },
          {
            name: 'status',
            in: 'query',
            description: 'Return Based on User Application status',
            type: 'string',
            enum: ['ACTIVE', 'INACTIVE', 'DELETED']
          },
          {
            name: 'skipPagination',
            in: 'query',
            description: 'Return all records',
            type: 'string',
            default: 'false',
            enum: ['true', 'false']
          },
          {
            name: 'page',
            in: 'query',
            type: 'number',
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        summary: 'Return list of User',
        description: 'Returns list of User from CRVS System',
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Find user by ID',
        description: 'Returns a single user',
        operationId: 'getUserById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return single user data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      put: {
        tags: ['Users'],
        summary: 'Update user by ID',
        description: 'Update single user data',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Update single user data',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'name',
            schema: {
              $ref: '#/definitions/Request/User/update'
            }
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      delete: {
        tags: ['Users'],
        summary: 'Delete user by ID',
        description: 'Delete single user data',
        operationId: 'deleteUserById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Delete single user data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/users/deactivate': {
      get: {
        tags: ['Users'],
        summary: 'Deactivate user by ID',
        description: 'Deactivate user by ID',
        operationId: 'getUserById',
        parameters: [
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/users/deleteByIds': {
      delete: {
        tags: ['Users'],
        summary: 'Delete User by IDs',
        description: 'Delete multiple User data',
        operationId: 'deleteUserByIds',
        parameters: [
          {
            in: 'body',
            name: 'ids',
            schema: {
              $ref: '#/definitions/Request/User/deleteByIds'
            }
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/users/deactivateDeceased': {
      put: {
        tags: ['Users'],
        summary: 'Deactivate User when deceased',
        description: 'Deactivate User when deceased',
        operationId: 'deactivateDeceased',
        parameters: [
          {
            name: 'User',
            in: 'body',
            schema: {
              $ref: '#/definitions/Request/User/deactivateDeceased'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/transferApplications': {
      post: {
        tags: ['Transfer Applications'],
        summary: 'Add a new Transfer Application',
        description: 'Add new Transfer Application to CRVS System',
        parameters: [
          {
            name: 'Transfer Application',
            in: 'body',
            schema: {
              $ref: '#/definitions/Request/TransferApplication/create'
            }
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      get: {
        tags: ['Transfer Applications'],
        parameters: [
          {
            name: 'name',
            in: 'query',
            description: 'Return list of Transfer Application'
          },
          {
            name: 'fromDate',
            in: 'query',
            description: 'Return list of Transfer Application'
          },
          {
            name: 'toDate',
            in: 'query',
            description: 'Return list of Transfer Application'
          },
          {
            name: 'approvedFromDate',
            in: 'query',
            description: 'Return list of Transfer Application'
          },
          {
            name: 'approvedToDate',
            in: 'query',
            description: 'Return list of Transfer Application'
          },
          {
            name: 'status',
            in: 'query',
            description: 'Return Based on Transfer Application status',
            type: 'string',
            enum: ['UN_APPROVED', 'APPROVED', 'REJECTED', 'DELETED']
          },
          {
            name: 'skipPagination',
            in: 'query',
            description: 'Return all records',
            type: 'string',
            default: 'false',
            enum: ['true', 'false']
          },
          {
            name: 'page',
            in: 'query',
            type: 'number',
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        summary: 'Return list of Transfer Application',
        description: 'Returns list of Transfer Application from CRVS System',
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/transferApplications/{id}': {
      get: {
        tags: ['Transfer Applications'],
        summary: 'Find transfer application by ID',
        description: 'Returns a single transfer application',
        operationId: 'getTAById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return single transfer application data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      put: {
        tags: ['Transfer Applications'],
        summary: 'Update transfer application by ID',
        description: 'Update single transfer application data',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Update single transfer application data',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'name',
            schema: {
              $ref: '#/definitions/Request/TransferApplication/update'
            }
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      delete: {
        tags: ['Transfer Applications'],
        summary: 'Delete transfer application by ID',
        description: 'Delete single transfer application data',
        operationId: 'deleteTAById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Delete single transfer application data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/transferApplications/transferLogs': {
      get: {
        tags: ['Transfer Logs'],
        parameters: [
          {
            name: 'name',
            in: 'query',
            description: 'Return list of Transfer Logs'
          },
          {
            name: 'fromDate',
            in: 'query',
            description: 'Return list of Transfer Logs'
          },
          {
            name: 'toDate',
            in: 'query',
            description: 'Return list of Transfer Logs'
          },
          {
            name: 'approvedFromDate',
            in: 'query',
            description: 'Return list of Transfer Logs'
          },
          {
            name: 'approvedToDate',
            in: 'query',
            description: 'Return list of Transfer Logs'
          },
          {
            name: 'status',
            in: 'query',
            description: 'Return Based on Transfer Logs status',
            type: 'string',
            enum: ['UN_APPROVED', 'APPROVED', 'REJECTED', 'DELETED']
          },
          {
            name: 'skipPagination',
            in: 'query',
            description: 'Return all records',
            type: 'string',
            default: 'false',
            enum: ['true', 'false']
          },
          {
            name: 'page',
            in: 'query',
            type: 'number',
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        summary: 'Return list of Transfer Logs',
        description: 'Returns list of Transfer Logs from CRVS System',
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/transferApplications/pendingRequest': {
      get: {
        tags: ['Transfer Logs'],
        parameters: [
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        summary: 'Return list of Transfer Logs',
        description: 'Returns list of Transfer Logs from CRVS System',
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/transferApplications/pendingRequest/:id': {
      get: {
        tags: ['Transfer Logs'],
        parameters: [
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        summary: 'Return list of Transfer Logs',
        description: 'Returns list of Transfer Logs from CRVS System',
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/deactivateLogs': {
      post: {
        tags: ['Deactivate Logs'],
        summary: 'Add a new Deactivate Log',
        description: 'Add new Deactivate Log to CRVS System',
        parameters: [
          {
            name: 'Deactivate Log',
            in: 'body',
            schema: {
              $ref: '#/definitions/Request/DeactivateLog/create'
            }
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      get: {
        tags: ['Deactivate Logs'],
        parameters: [
          {
            name: 'name',
            in: 'query',
            description: 'Return list of Deactivate Log'
          },
          {
            name: 'documentNumber',
            in: 'query',
            description: 'Return list of Deactivate Log'
          },
          {
            name: 'phoneNumber',
            in: 'query',
            description: 'Return list of Deactivate Log'
          },
          {
            name: 'email',
            in: 'query',
            description: 'Return list of Deactivate Log'
          },
          {
            name: 'role',
            in: 'query',
            description: 'Return list of Deactivate Log'
          },
          {
            name: 'fromDate',
            in: 'query',
            description: 'Return list of Deactivate Log'
          },
          {
            name: 'toDate',
            in: 'query',
            description: 'Return list of Deactivate Log'
          },
          {
            name: 'approvedFromDate',
            in: 'query',
            description: 'Return list of Deactivate Log'
          },
          {
            name: 'approvedToDate',
            in: 'query',
            description: 'Return list of Deactivate Log'
          },
          {
            name: 'status',
            in: 'query',
            description: 'Return Based on Deactivate Log status',
            type: 'string',
            enum: ['UN_APPROVED', 'APPROVED', 'REJECTED', 'DELETED']
          },
          {
            name: 'skipPagination',
            in: 'query',
            description: 'Return all records',
            type: 'string',
            default: 'false',
            enum: ['true', 'false']
          },
          {
            name: 'page',
            in: 'query',
            type: 'number',
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        summary: 'Return list of Deactivate Log',
        description: 'Returns list of Deactivate Log from CRVS System',
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/deactivateLogs/{id}': {
      get: {
        tags: ['Deactivate Logs'],
        summary: 'Find deactivate log by ID',
        description: 'Returns a single deactivate log',
        operationId: 'getDLById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return single deactivate log data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      put: {
        tags: ['Deactivate Logs'],
        summary: 'Update deactivate log by ID',
        description: 'Update single deactivate log data',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Update single deactivate log data',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'name',
            schema: {
              $ref: '#/definitions/Request/DeactivateLog/update'
            }
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      delete: {
        tags: ['Deactivate Logs'],
        summary: 'Delete deactivate log by ID',
        description: 'Delete single deactivate log data',
        operationId: 'deleteDLById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Delete single deactivate log data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/citizens/getCitizen': {
      post: {
        tags: ['User Citizens'],
        summary: 'Get Citizens details',
        description: 'Retrieve information of the citizen given the number of the citizen ‘s document',
        operationId: 'GetCitizenDetails',
        parameters: [
          {
            name: 'citizen',
            in: 'body',
            schema: {
              $ref: '#/definitions/Request/Citizens/getDetails'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/citizens/base64ToImage': {
      post: {
        tags: ['User Citizens'],
        summary: 'Convert Base64image to jpg image',
        description: 'Convert Base64image to jpg image',
        operationId: 'convertBase64ToImage',
        parameters: [
          {
            name: 'baseImage',
            in: 'body',
            schema: {
              $ref: '#/definitions/Request/Citizens/convertToImage'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/workLog/': {
      get: {
        tags: ['Work Logs'],
        summary: 'Find user work logs',
        description: 'Returns user work logs',
        operationId: 'getUWLAUById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return user work logs data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/workLog/list/{id}': {
      get: {
        tags: ['Work Logs'],
        summary: 'Find user work logs by user ID',
        description: 'Returns user work logs by user ID',
        operationId: 'getUWLAById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return user work logs data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/launchersettings': {
      post: {
        tags: ['Launcher Settings'],
        summary: 'Add/Update a Launcher Settings',
        description: 'Add/Update a Launcher Settings to CRVS System',
        parameters: [
          {
            name: 'Launcher Settings',
            in: 'body',
            schema: {
              $ref: '#/definitions/Request/LauncherSettings/create'
            }
          },
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      get: {
        tags: ['Launcher Settings'],
        parameters: [
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        summary: 'Return list of User Application',
        description: 'Returns list of User Application from CRVS System',
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/launchersettings/getList': {
      get: {
        tags: ['Lanucher Settings'],
        parameters: [
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        summary: 'Return list of User settings',
        description: 'Returns list of User settings from CRVS System',
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/launchersettings/getAll': {
      get: {
        tags: ['Launcher Settings'],
        parameters: [
          { $ref: '#/definitions/Headers/content_type' },
          { $ref: '#/definitions/Headers/auth_token' }
        ],
        summary: 'Return list of All the User settings',
        description: 'Returns list of  All the User settings from CRVS System',
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    }

  },

  definitions
}
