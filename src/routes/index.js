const express = require('express')
const router = express.Router()

// Importar todas as rotas
const apiRoutes = require('./api')
const healthRoutes = require('./health')
const usersRoutes = require('./users')
const productsRoutes = require('./products')

// Configurar rotas
router.use('/', apiRoutes)
router.use('/api/health', healthRoutes)
router.use('/api/users', usersRoutes)
router.use('/api/products', productsRoutes)

module.exports = router
