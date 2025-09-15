const express = require('express')
const router = express.Router()
const { getApiInfo, getDocs } = require('../controllers/api')

// GET /
router.get('/', getApiInfo)

// GET /docs
router.get('/docs', getDocs)

module.exports = router
