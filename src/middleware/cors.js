const config = require('../config/app')

const corsMiddleware = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.cors.origin)
  res.header('Access-Control-Allow-Methods', config.cors.methods.join(', '))
  res.header('Access-Control-Allow-Headers', config.cors.headers.join(', '))
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  
  next()
}

module.exports = corsMiddleware
