const userApplication = require('./userApplications')
const user = require('./users')
const transferApplication = require('./transferApplications')
const transferLog = require('./transferLogs')
const deactivateLog = require('./deactivateLogs')
const launcherSettings = require('./launcherSettings')
const citizens = require('./citizens')
const headers = require('./header')
const response = require('./response')

module.exports = {
  UserApplication: userApplication,
  TransferApplication: transferApplication,
  DeactivateLog: deactivateLog,
  Citizens: citizens,
  LauncherSettings: launcherSettings,
  User: user,
  Headers: headers,
  Request: {
    UserApplication: userApplication,
    User: user,
    TransferApplication: transferApplication,
    TransferLog: transferLog,
    DeactivateLog: deactivateLog,
    Citizens: citizens,
    LauncherSettings: launcherSettings
  },
  Response: response
}
