require('dotenv').config()

const jwt = require('jsonwebtoken')
const usersModel = require('../models/usersModel')

module.exports = {
  register: (req, res) => {
    const { username, password, email } = req.body

    if (typeof username !== 'string' || typeof email !== 'string') {
      return res.status(400).json({ error: 'Please provide valid input' })
    }

    const newUser = usersModel.newUser(username, email, password)

    res.status(201).json({newUser})
  },

  adminRegister: (req, res) => {
    const userAcess = req?.authenticatedUser ?? 'visitante'

    if (userAcess.role !== 'admin') {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { username, password, email, role } = req.body

    if (typeof username !== 'string' || typeof email !== 'string') {
      return res.status(400).json({ error: 'Please provide valid input' })
    }

    const newUser = usersModel.adminNewUser(username, email, password, role)

    res.status(201).json({ ...newUser, password: undefined })
  },

  login: (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide all fields' })
    }

    const user = usersModel.loginMethod(email, password)

    const payload = { id: user.id, email: user.email }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.json({ token })
  },
}
