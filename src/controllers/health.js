
const response = require('../utils/response')

const getHealth = (req, res) => {
  const healthData = {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  }
  
  return response.success(res, healthData, 'API funcionando normalmente')
}

module.exports = {
  getHealth
}
