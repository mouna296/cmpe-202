const express = require('express')
const dashboardController = require('../controllers/dashboardController')
const router = express.Router()

const { protect, authorize } = require('../middleware/auth')


module.exports = router