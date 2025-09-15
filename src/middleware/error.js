const response = require('../utils/response')

const errorHandler = (err, req, res, next) => {
  console.error('Erro:', err)
  return response.error(res, 'Erro interno do servidor', 500)
}

const notFoundHandler = (req, res) => {
  return response.notFound(res, 'Endpoint não encontrado')
}

module.exports = {
  errorHandler,
  notFoundHandler
}
