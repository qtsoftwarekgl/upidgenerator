const express = require('express')
const router = express.Router()
const Controller = require('./controller')
const Validator = require('../base/Validator')
const requestValidator = require('./requestValidator')

const controller = new Controller()
const validator = new Validator()

router
  .route('/getCitizen')
  .post(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.getCitizen)
    ),
    controller.getCitizen.bind(controller)
  )

router
  .route('/syncPatient')
  .post(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.syncPatient)
    ),
    controller.syncPatient.bind(controller)
  )

module.exports = router
