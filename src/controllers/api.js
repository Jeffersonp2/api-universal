const response = require('../utils/response')

const getApiInfo = (req, res) => {
  const apiInfo = {
    name: 'API Universal',
    version: '1.0.0',
    description: 'API RESTful modular com Express',
    author: 'jefferson oliveira',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      users: '/api/users',
      products: '/api/products',
      docs: '/api/docs'
    }
  }
  
  return response.success(res, apiInfo, 'Informações da API')
}

const getDocs = (req, res) => {
  const docs = {
    title: 'API Universal - Documentação',
    version: '1.0.0',
    baseUrl: `http://localhost:${process.env.PORT || 3000}`,
    endpoints: [
      {
        method: 'GET',
        path: '/',
        description: 'Informações da API'
      },
      {
        method: 'GET',
        path: '/api/health',
        description: 'Status da API'
      },
      {
        method: 'GET',
        path: '/api/users',
        description: 'Listar todos os usuários'
      },
      {
        method: 'GET',
        path: '/api/users/:id',
        description: 'Buscar usuário por ID'
      },
      {
        method: 'POST',
        path: '/api/users',
        description: 'Criar novo usuário',
        body: {
          name: 'string (obrigatório)',
          email: 'string (obrigatório)'
        }
      },
      {
        method: 'PUT',
        path: '/api/users/:id',
        description: 'Atualizar usuário',
        body: {
          name: 'string (opcional)',
          email: 'string (opcional)'
        }
      },
      {
        method: 'DELETE',
        path: '/api/users/:id',
        description: 'Remover usuário'
      },
      {
        method: 'GET',
        path: '/api/products',
        description: 'Listar todos os produtos'
      },
      {
        method: 'GET',
        path: '/api/products/:id',
        description: 'Buscar produto por ID'
      },
      {
        method: 'POST',
        path: '/api/products',
        description: 'Criar novo produto',
        body: {
          name: 'string (obrigatório)',
          price: 'number (obrigatório)',
          category: 'string (obrigatório)',
          stock: 'number (opcional)'
        }
      },
      {
        method: 'PUT',
        path: '/api/products/:id',
        description: 'Atualizar produto',
        body: {
          name: 'string (opcional)',
          price: 'number (opcional)',
          category: 'string (opcional)',
          stock: 'number (opcional)'
        }
      },
      {
        method: 'DELETE',
        path: '/api/products/:id',
        description: 'Remover produto'
      }
    ]
  }
  
  return response.success(res, docs, 'Documentação da API')
}

module.exports = {
  getApiInfo,
  getDocs
}
