const express = require('express')
const config = require('./src/config/app')

// Importar middlewares
const corsMiddleware = require('./src/middleware/cors')
const loggerMiddleware = require('./src/middleware/logger')
const { errorHandler, notFoundHandler } = require('./src/middleware/error')

// Importar rotas
const routes = require('./src/routes')

// Criar aplicação Express
const app = express()

// Middlewares globais
app.use(express.json())
app.use(corsMiddleware)
app.use(loggerMiddleware)

// Rotas
app.use('/', routes)

// Middlewares de erro (devem vir por último)
app.use(notFoundHandler)
app.use(errorHandler)

// Iniciar servidor
const port = config.port

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`)
  console.log(`📚 Documentação em http://localhost:${port}/docs`)
  console.log(`🏥 Health check em http://localhost:${port}/api/health`)
  console.log(`👥 Usuários em http://localhost:${port}/api/users`)
})