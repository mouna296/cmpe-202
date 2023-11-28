const express = require('express')
const dashboardController = require('../controllers/dashboardController')
const router = express.Router()

const { protect, authorize } = require('../middleware/auth')

router
	.get('/occupancy',dashboardController.getOccupancyData)

module.exports = router