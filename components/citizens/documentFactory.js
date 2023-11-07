const Service = require('./service')
const NidDetails = require('./nidDetails')

class DocumentFactory {
  documentBuild (type) {
    switch (type) {
      case 'UPI':
        return new NidDetails()
      default:
        return new Service()
    }
  }
}

module.exports = DocumentFactory
