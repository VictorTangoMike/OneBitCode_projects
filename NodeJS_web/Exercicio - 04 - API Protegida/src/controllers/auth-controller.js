const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/enviroment')
const users = require('../models/users')

module.exports = {
  register: (req, res) => {
    const { username, password, email } = req.body

    if (typeof username !== 'string' || typeof email !== 'string') {
      return res.status(400).json({ error: 'Please provide valid input' })
    }

    const newUser = users.newUser(username, email, password)

    if (!newUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    res.status(201).json(newUser)
  },

  adminRegister: (req, res) => {
    const userAcess = req?.authenticatedUser ?? 'visitante'

    if (userAcess !== 'admin') {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { username, password, email, role } = req.body

    if (typeof username !== 'string' || typeof email !== 'string') {
      return res.status(400).json({ error: 'Please provide valid input' })
    }

    const newUser = users.adminNewUser(username, email, password, role)

    if (!newUser) {
      return res.status(400).json({ error: 'E-mail already exists' })
    }

    res.status(201).json(newUser)
  },

  login: (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide all fields' })
    }

    const user = users.loginMethod(email, password)

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const payload = { id: user.id, email: user.email }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })

    res.json({ token })
  },
}
