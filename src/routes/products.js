const express = require('express')
const router = express.Router()
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products')

// GET /api/products
router.get('/', getProducts)

// GET /api/products/:id
router.get('/:id', getProductById)

// POST /api/products
router.post('/', createProduct)

// PUT /api/products/:id
router.put('/:id', updateProduct)

// DELETE /api/products/:id
router.delete('/:id', deleteProduct)

module.exports = router
