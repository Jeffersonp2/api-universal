const response = require('../utils/response')

// Dados mockados para exemplo
const users = [
  { id: 1, name: 'João Silva', email: 'joao@example.com', createdAt: '2024-01-15' },
  { id: 2, name: 'Maria Santos', email: 'maria@example.com', createdAt: '2024-01-16' },
  { id: 3, name: 'Pedro Costa', email: 'pedro@example.com', createdAt: '2024-01-17' }
]

const getUsers = (req, res) => {
  return response.success(res, { users }, 'Usuários listados com sucesso')
}

const getUserById = (req, res) => {
  const { id } = req.params
  const user = users.find(u => u.id === parseInt(id))
  
  if (!user) {
    return response.notFound(res, 'Usuário não encontrado')
  }
  
  return response.success(res, { user }, 'Usuário encontrado')
}

const createUser = (req, res) => {
  try {
    const { name, email } = req.body
    
    if (!name || !email) {
      return response.error(res, 'Nome e email são obrigatórios', 400)
    }
    
    const newUser = {
      id: users.length + 1,
      name,
      email,
      createdAt: new Date().toISOString().split('T')[0]
    }
    
    users.push(newUser)
    
    return response.success(res, { user: newUser }, 'Usuário criado com sucesso')
  } catch (error) {
    return response.error(res, 'Erro ao criar usuário', 400)
  }
}

const updateUser = (req, res) => {
  try {
    const { id } = req.params
    const { name, email } = req.body
    
    const userIndex = users.findIndex(u => u.id === parseInt(id))
    
    if (userIndex === -1) {
      return response.notFound(res, 'Usuário não encontrado')
    }
    
    if (name) users[userIndex].name = name
    if (email) users[userIndex].email = email
    
    return response.success(res, { user: users[userIndex] }, 'Usuário atualizado com sucesso')
  } catch (error) {
    return response.error(res, 'Erro ao atualizar usuário', 400)
  }
}

const deleteUser = (req, res) => {
  try {
    const { id } = req.params
    const userIndex = users.findIndex(u => u.id === parseInt(id))
    
    if (userIndex === -1) {
      return response.notFound(res, 'Usuário não encontrado')
    }
    
    const deletedUser = users.splice(userIndex, 1)[0]
    
    return response.success(res, { user: deletedUser }, 'Usuário removido com sucesso')
  } catch (error) {
    return response.error(res, 'Erro ao remover usuário', 400)
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
