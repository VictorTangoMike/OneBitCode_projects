const express = require('express')
const auth = require('../controllers/auth-controller')
const users = require('../controllers/users-controller')
const { optionalAuth } = require('../middlewares/auth-middleware')

const routes = express.Router()

routes.get('/welcome', optionalAuth, (req,res) => {
  const displayName = req.authenticatedUser?.username ?? 'visitante'

  res.json({ message: `Seja bem-vindo(a), ${displayName}!` })
})

// authentication routes
routes.post('/auth/register', auth.register)
routes.post('/auth/register/admin', optionalAuth, auth.adminRegister)
routes.post('/auth/login', auth.login)

// users routes
routes.get('/users/list', optionalAuth, users.listUsers) 
routes.put('/users/:id/update-role', optionalAuth, users.updateRole)

routes.put('/users/:id/update-password', users.updatePassword)

routes.delete('/users/delete/:id', optionalAuth, users.deleteUser)

module.exports = routes
