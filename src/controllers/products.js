const response = require('../utils/response')

// Dados mockados para exemplo
const products = [
  { id: 1, name: 'Smartphone', price: 999.99, category: 'eletrônicos', stock: 50 },
  { id: 2, name: 'Notebook', price: 1999.99, category: 'eletrônicos', stock: 25 },
  { id: 3, name: 'Camiseta', price: 29.99, category: 'roupas', stock: 100 }
]

const getProducts = (req, res) => {
  return response.success(res, { products }, 'Produtos listados com sucesso')
}

const getProductById = (req, res) => {
  const { id } = req.params
  const product = products.find(p => p.id === parseInt(id))
  
  if (!product) {
    return response.notFound(res, 'Produto não encontrado')
  }
  
  return response.success(res, { product }, 'Produto encontrado')
}

const createProduct = (req, res) => {
  try {
    const { name, price, category, stock } = req.body
    
    // Validações
    if (!name || !price || !category) {
      return response.error(res, 'Nome, preço e categoria são obrigatórios', 400)
    }
    
    if (price <= 0) {
      return response.error(res, 'Preço deve ser maior que zero', 400)
    }
    
    const newProduct = {
      id: products.length + 1,
      name,
      price: parseFloat(price),
      category,
      stock: stock || 0,
      createdAt: new Date().toISOString().split('T')[0]
    }
    
    products.push(newProduct)
    
    return response.success(res, { product: newProduct }, 'Produto criado com sucesso')
  } catch (error) {
    return response.error(res, 'Erro ao criar produto', 400)
  }
}

const updateProduct = (req, res) => {
  try {
    const { id } = req.params
    const { name, price, category, stock } = req.body
    
    const productIndex = products.findIndex(p => p.id === parseInt(id))
    
    if (productIndex === -1) {
      return response.notFound(res, 'Produto não encontrado')
    }
    
    // Atualizar apenas campos fornecidos
    if (name) products[productIndex].name = name
    if (price) products[productIndex].price = parseFloat(price)
    if (category) products[productIndex].category = category
    if (stock !== undefined) products[productIndex].stock = parseInt(stock)
    
    return response.success(res, { product: products[productIndex] }, 'Produto atualizado com sucesso')
  } catch (error) {
    return response.error(res, 'Erro ao atualizar produto', 400)
  }
}

const deleteProduct = (req, res) => {
  try {
    const { id } = req.params
    const productIndex = products.findIndex(p => p.id === parseInt(id))
    
    if (productIndex === -1) {
      return response.notFound(res, 'Produto não encontrado')
    }
    
    const deletedProduct = products.splice(productIndex, 1)[0]
    
    return response.success(res, { product: deletedProduct }, 'Produto removido com sucesso')
  } catch (error) {
    return response.error(res, 'Erro ao remover produto', 400)
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}
