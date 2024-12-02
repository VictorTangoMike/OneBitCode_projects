const express = require('express')
const postsController = require('./controllers/postController')

const routes = express.Router()

// Rota para a página inicial do blog
routes.get('/', postsController.index)

// Rota para exibir um post específico
routes.get('/posts/:id', postsController.show)

module.exports = routes