# 📚 Manual para Adicionar Novas Rotas

## 🎯 Visão Geral

Este manual explica como adicionar novas rotas ao projeto modular da API Universal. O projeto segue uma arquitetura MVC (Model-View-Controller) com separação clara de responsabilidades.

## 📁 Estrutura do Projeto

```
src/
├── config/          # Configurações
├── controllers/     # Lógica de negócio
├── middleware/      # Middlewares personalizados
├── models/         # Modelos de dados
├── routes/         # Definição das rotas
└── utils/          # Utilitários
```

## 🚀 Passo a Passo para Adicionar Novas Rotas

### 1️⃣ **Criar o Controller**

Primeiro, crie o arquivo do controller em `src/controllers/`:

**Exemplo: `src/controllers/products.js`**

```javascript
const response = require('../utils/response')

// Dados mockados (substitua por banco de dados)
const products = [
  { id: 1, name: 'Produto 1', price: 29.99, category: 'eletrônicos' },
  { id: 2, name: 'Produto 2', price: 19.99, category: 'roupas' }
]

// GET /api/products - Listar todos os produtos
const getProducts = (req, res) => {
  return response.success(res, { products }, 'Produtos listados com sucesso')
}

// GET /api/products/:id - Buscar produto por ID
const getProductById = (req, res) => {
  const { id } = req.params
  const product = products.find(p => p.id === parseInt(id))
  
  if (!product) {
    return response.notFound(res, 'Produto não encontrado')
  }
  
  return response.success(res, { product }, 'Produto encontrado')
}

// POST /api/products - Criar novo produto
const createProduct = (req, res) => {
  try {
    const { name, price, category } = req.body
    
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
      createdAt: new Date().toISOString().split('T')[0]
    }
    
    products.push(newProduct)
    
    return response.success(res, { product: newProduct }, 'Produto criado com sucesso')
  } catch (error) {
    return response.error(res, 'Erro ao criar produto', 400)
  }
}

// PUT /api/products/:id - Atualizar produto
const updateProduct = (req, res) => {
  try {
    const { id } = req.params
    const { name, price, category } = req.body
    
    const productIndex = products.findIndex(p => p.id === parseInt(id))
    
    if (productIndex === -1) {
      return response.notFound(res, 'Produto não encontrado')
    }
    
    // Atualizar apenas campos fornecidos
    if (name) products[productIndex].name = name
    if (price) products[productIndex].price = parseFloat(price)
    if (category) products[productIndex].category = category
    
    return response.success(res, { product: products[productIndex] }, 'Produto atualizado com sucesso')
  } catch (error) {
    return response.error(res, 'Erro ao atualizar produto', 400)
  }
}

// DELETE /api/products/:id - Remover produto
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

// Exportar todas as funções
module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}
```

### 2️⃣ **Criar as Rotas**

Crie o arquivo de rotas em `src/routes/`:

**Exemplo: `src/routes/products.js`**

```javascript
const express = require('express')
const router = express.Router()

// Importar o controller
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products')

// Definir as rotas
router.get('/', getProducts)           // GET /api/products
router.get('/:id', getProductById)     // GET /api/products/:id
router.post('/', createProduct)        // POST /api/products
router.put('/:id', updateProduct)      // PUT /api/products/:id
router.delete('/:id', deleteProduct)   // DELETE /api/products/:id

module.exports = router
```

### 3️⃣ **Registrar as Rotas**

Atualize o arquivo `src/routes/index.js` para incluir as novas rotas:

```javascript
const express = require('express')
const router = express.Router()

// Importar todas as rotas existentes
const apiRoutes = require('./api')
const healthRoutes = require('./health')
const usersRoutes = require('./users')

// Importar as novas rotas
const productsRoutes = require('./products')  // ← NOVA ROTA

// Configurar rotas
router.use('/', apiRoutes)
router.use('/api/health', healthRoutes)
router.use('/api/users', usersRoutes)
router.use('/api/products', productsRoutes)  // ← REGISTRAR NOVA ROTA

module.exports = router
```

### 4️⃣ **Atualizar a Documentação**

Atualize o controller da API em `src/controllers/api.js` para incluir as novas rotas na documentação:

```javascript
// No método getApiInfo, adicione:
endpoints: {
  health: '/api/health',
  users: '/api/users',
  products: '/api/products',  // ← NOVA ROTA
  docs: '/api/docs'
}

// No método getDocs, adicione os novos endpoints:
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
    category: 'string (obrigatório)'
  }
},
{
  method: 'PUT',
  path: '/api/products/:id',
  description: 'Atualizar produto',
  body: {
    name: 'string (opcional)',
    price: 'number (opcional)',
    category: 'string (opcional)'
  }
},
{
  method: 'DELETE',
  path: '/api/products/:id',
  description: 'Remover produto'
}
```

## 🔧 Middlewares Personalizados

### Criar Middleware de Validação

**Exemplo: `src/middleware/validation.js`**

```javascript
const response = require('../utils/response')

const validateProduct = (req, res, next) => {
  const { name, price, category } = req.body
  
  if (!name || !price || !category) {
    return response.error(res, 'Nome, preço e categoria são obrigatórios', 400)
  }
  
  if (price <= 0) {
    return response.error(res, 'Preço deve ser maior que zero', 400)
  }
  
  next()
}

module.exports = {
  validateProduct
}
```

### Usar Middleware nas Rotas

```javascript
const express = require('express')
const router = express.Router()
const { validateProduct } = require('../middleware/validation')

// Aplicar middleware apenas nas rotas que precisam
router.post('/', validateProduct, createProduct)
router.put('/:id', validateProduct, updateProduct)
```

## 📊 Padrões de Resposta

### Resposta de Sucesso
```javascript
return response.success(res, { data }, 'Mensagem de sucesso')
```

### Resposta de Erro
```javascript
return response.error(res, 'Mensagem de erro', 400)
```

### Resposta Não Encontrado
```javascript
return response.notFound(res, 'Recurso não encontrado')
```

## 🧪 Testando as Novas Rotas

### Testar com curl:

```bash
# Listar produtos
curl http://localhost:3000/api/products

# Buscar produto por ID
curl http://localhost:3000/api/products/1

# Criar produto
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Novo Produto","price":99.99,"category":"eletrônicos"}'

# Atualizar produto
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Produto Atualizado","price":149.99}'

# Remover produto
curl -X DELETE http://localhost:3000/api/products/1
```

## 📝 Checklist para Novas Rotas

- [ ] ✅ Criar controller em `src/controllers/`
- [ ] ✅ Criar rotas em `src/routes/`
- [ ] ✅ Registrar rotas em `src/routes/index.js`
- [ ] ✅ Atualizar documentação em `src/controllers/api.js`
- [ ] ✅ Adicionar validações necessárias
- [ ] ✅ Testar todas as rotas
- [ ] ✅ Verificar respostas padronizadas
- [ ] ✅ Adicionar tratamento de erros

## 🎯 Exemplo Completo: Rotas de Pedidos

### Controller: `src/controllers/orders.js`
```javascript
const response = require('../utils/response')

const orders = []

const getOrders = (req, res) => {
  return response.success(res, { orders }, 'Pedidos listados')
}

const createOrder = (req, res) => {
  const { products, customerName } = req.body
  
  const newOrder = {
    id: orders.length + 1,
    products,
    customerName,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
  
  orders.push(newOrder)
  return response.success(res, { order: newOrder }, 'Pedido criado')
}

module.exports = { getOrders, createOrder }
```

### Rotas: `src/routes/orders.js`
```javascript
const express = require('express')
const router = express.Router()
const { getOrders, createOrder } = require('../controllers/orders')

router.get('/', getOrders)
router.post('/', createOrder)

module.exports = router
```

### Registrar: `src/routes/index.js`
```javascript
const ordersRoutes = require('./orders')
router.use('/api/orders', ordersRoutes)
```

## 🚀 Próximos Passos

1. **Banco de Dados:** Substituir dados mockados por banco real
2. **Autenticação:** Adicionar middleware de autenticação
3. **Validação:** Usar bibliotecas como Joi ou Yup
4. **Testes:** Implementar testes unitários
5. **Logs:** Adicionar sistema de logging avançado

---

**🎉 Agora você pode adicionar quantas rotas quiser seguindo este padrão modular!**
