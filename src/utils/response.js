const config = require('../config/app')

module.exports = {
  success: (res, data, message = 'Sucesso') => {
    return res.json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    })
  },
  
  error: (res, message = 'Erro interno do servidor', statusCode = 500) => {
    return res.status(statusCode).json({
      success: false,
      message,
      timestamp: new Date().toISOString()
    })
  },
  
  notFound: (res, message = 'Recurso não encontrado') => {
    return res.status(404).json({
      success: false,
      message,
      timestamp: new Date().toISOString()
    })
  }
}
