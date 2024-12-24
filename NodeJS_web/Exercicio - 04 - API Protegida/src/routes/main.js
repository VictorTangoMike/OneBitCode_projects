const express = require('express')
const auth = require('../controllers/auth-controller')
const usersController = require('../controllers/users-controller')

const routes = express.Router()

routes.get('/welcome', (req,res) => {
  const displayName = req.authenticatedUser?.name ?? 'visitante'

  res.json({ message: `Seja bem-vindo(a), ${displayName}!` })
})

// authentication routes
routes.post('/auth/register', auth.register)

routes.post('/auth/login', auth.login)

routes.delete('/users/delete/:id', usersController.deleteUser)

module.exports = routes
