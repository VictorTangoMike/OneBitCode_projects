require('dotenv').config()

const jwt = require('jsonwebtoken')
const usersModel = require('../models/usersModel')

module.exports = {
  optionalAuth: (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      next()
    } else {
      const token = authHeader.split(' ')[1]

      try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET)

        const user = usersModel.findById(id)

        req.authenticatedUser = user
        next()
      } catch (error) {
        return res.status(401).json({ message: 'Invalid token!' })
      }
    }
  },
}
