const express = require('express')
const router = express.Router()
const { getHealth } = require('../controllers/health')

// GET /api/health
router.get('/', getHealth)

module.exports = router
