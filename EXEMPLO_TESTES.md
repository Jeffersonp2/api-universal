# 🧪 Exemplo Prático: Testando as Novas Rotas

## 📋 Comandos para Testar as Rotas de Produtos

### 1️⃣ **Listar todos os produtos**
```bash
curl http://localhost:3000/api/products
```

### 2️⃣ **Buscar produto por ID**
```bash
curl http://localhost:3000/api/products/1
```

### 3️⃣ **Criar novo produto**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tablet",
    "price": 599.99,
    "category": "eletrônicos",
    "stock": 30
  }'
```

### 4️⃣ **Atualizar produto**
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Smartphone Pro",
    "price": 1299.99,
    "stock": 45
  }'
```

### 5️⃣ **Remover produto**
```bash
curl -X DELETE http://localhost:3000/api/products/1
```

## 🔍 **Testando Validações**

### ❌ **Erro: Campos obrigatórios**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Produto sem preço"
  }'
```

### ❌ **Erro: Preço inválido**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Produto",
    "price": -10,
    "category": "teste"
  }'
```

### ❌ **Erro: Produto não encontrado**
```bash
curl http://localhost:3000/api/products/999
```

## 📊 **Respostas Esperadas**

### ✅ **Sucesso (200)**
```json
{
  "success": true,
  "message": "Produtos listados com sucesso",
  "data": {
    "products": [...]
  },
  "timestamp": "2025-09-15T00:46:15.187Z"
}
```

### ❌ **Erro (400)**
```json
{
  "success": false,
  "message": "Nome, preço e categoria são obrigatórios",
  "timestamp": "2025-09-15T00:46:15.187Z"
}
```

### ❌ **Não Encontrado (404)**
```json
{
  "success": false,
  "message": "Produto não encontrado",
  "timestamp": "2025-09-15T00:46:15.187Z"
}
```

## 🎯 **Próximos Passos**

1. **Teste todas as rotas** seguindo os exemplos acima
2. **Verifique a documentação** em `/docs`
3. **Adicione mais rotas** seguindo o manual
4. **Implemente validações** mais complexas
5. **Conecte com banco de dados** real

---

**🚀 Agora você tem um exemplo completo funcionando!**
