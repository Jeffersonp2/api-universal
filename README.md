# 🚀 API Universal

Uma API RESTful modular construída com Express.js, seguindo boas práticas de desenvolvimento e arquitetura MVC.

## 📋 Características

- ✅ **Arquitetura Modular** - Separação clara de responsabilidades
- ✅ **Middleware Personalizado** - CORS, logging e tratamento de erros
- ✅ **Respostas Padronizadas** - Formato JSON consistente
- ✅ **Documentação Automática** - Endpoints documentados automaticamente
- ✅ **Validação de Dados** - Validações robustas em todas as rotas
- ✅ **Health Check** - Monitoramento de status da API
- ✅ **Ngrok Integrado** - Exposição fácil para testes externos

## 🏗️ Estrutura do Projeto

```
src/
├── config/          # Configurações da aplicação
├── controllers/     # Lógica de negócio
├── middleware/      # Middlewares personalizados
├── models/          # Modelos de dados
├── routes/          # Definição das rotas
└── utils/           # Utilitários
```

## 🚀 Instalação e Uso

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/api-universal.git
cd api-universal
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Inicie a API
```bash
npm start
```

### 4. Exponha via ngrok (opcional)
```bash
npm run ngrok
```

## 📚 Endpoints Disponíveis

### 🏥 Health Check
- **GET** `/api/health` - Status da API

### 👥 Usuários
- **GET** `/api/users` - Listar todos os usuários
- **GET** `/api/users/:id` - Buscar usuário por ID
- **POST** `/api/users` - Criar novo usuário
- **PUT** `/api/users/:id` - Atualizar usuário
- **DELETE** `/api/users/:id` - Remover usuário

### 🛍️ Produtos
- **GET** `/api/products` - Listar todos os produtos
- **GET** `/api/products/:id` - Buscar produto por ID
- **POST** `/api/products` - Criar novo produto
- **PUT** `/api/products/:id` - Atualizar produto
- **DELETE** `/api/products/:id` - Remover produto

### 📖 Documentação
- **GET** `/` - Informações da API
- **GET** `/docs` - Documentação completa

## 🧪 Exemplos de Uso

### Criar um usuário
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com"
  }'
```

### Criar um produto
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Smartphone",
    "price": 999.99,
    "category": "eletrônicos",
    "stock": 50
  }'
```

### Verificar status da API
```bash
curl http://localhost:3000/api/health
```

## 📖 Documentação

Consulte o [Manual de Rotas](MANUAL_ROTAS.md) para aprender como adicionar novas rotas ao projeto.

## 🛠️ Scripts Disponíveis

```bash
npm start      # Inicia a API
npm run serve  # Alias para start
npm run ngrok  # Expõe via ngrok
```

## 🔧 Configuração

### Variáveis de Ambiente
```bash
PORT=3000                    # Porta da API (padrão: 3000)
NODE_ENV=development         # Ambiente (development/production)
```

### Configurações Personalizadas
Edite `src/config/app.js` para personalizar:
- Porta da aplicação
- Configurações de CORS
- Configurações de ambiente

## 📊 Formato de Resposta

Todas as respostas seguem o padrão:

### Sucesso
```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": { ... },
  "timestamp": "2025-09-15T00:46:15.187Z"
}
```

### Erro
```json
{
  "success": false,
  "message": "Mensagem de erro",
  "timestamp": "2025-09-15T00:46:15.187Z"
}
```

## 🚀 Deploy

### Heroku
```bash
# Instalar Heroku CLI
npm install -g heroku

# Login
heroku login

# Criar app
heroku create sua-api-universal

# Deploy
git push heroku main
```

### Vercel
```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Jefferson Oliveira**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- Email: jefferson@example.com

## 🙏 Agradecimentos

- Express.js pela framework robusta
- Comunidade Node.js pelo suporte
- Todos os contribuidores do projeto

---

⭐ **Se este projeto te ajudou, não esqueça de dar uma estrela!** ⭐
