const users = require('../models/users')

module.exports = {
  listUsers: (req, res) => {
    const userAcess = req?.authenticatedUser ?? 'visitante'

    if (userAcess.role === 'admin') {
      return res.status(200).json(users.findAll())
    }
    res.status(401).json({ error: 'Unauthorized' })
  },

  deleteUser: (req, res) => {
    const { id } = req.params

    const userAcess = req?.authenticatedUser ?? 'visitante'

    if (
      (userAcess.id !== req.params.id && userAcess.role !== 'admin') ||
      !userAcess
    ) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const deletedUser = users.findById(id)

    const newList = users.deleteUser(id)

    if (!newList) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(deletedUser)
  },

  updatePassword: (req, res) => {
    const { id } = req.params
    const { password, newPassword } = req.body

    const user = users.updatePassword(id, password, newPassword)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(201).json(user.id)
  },

  updateRole: (req, res) => {
    const { id } = req.params
    const { role } = req.body

    const userUpdating = req?.authenticatedUser

    const user = users.updateRole(id, role, userUpdating)

    if (user === 'Please provide valid input') {
      return res.status(404).json({ error: `${user}` })
    }
    if (user === 'Authentication is required') {
      return res.status(401).json({ error: `${user}` })
    }
    if (user === 'Unauthorized') {
      return res.status(401).json({ error: `${user}` })
    }

    res.status(201).json(user.id)
  },
}
