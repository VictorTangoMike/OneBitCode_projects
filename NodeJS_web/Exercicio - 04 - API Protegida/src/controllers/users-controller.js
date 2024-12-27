const usersModel = require('../models/usersModel')

module.exports = {
  listAllUsers: (req, res) => {
    const userAcess = req?.authenticatedUser ?? 'visitante'

    if (userAcess.role === 'admin') {
      return res
        .status(200)
        .json({ ...usersModel.findAll(), password: undefined })
    }
    res.status(401).json({ error: 'Unauthorized' })
  },

  getUser: (req, res) => {
    const { id } = req.params
    const user = usersModel.findById(id)
    res.status(200).json({ ...user, password: undefined })
  },

  deleteUser: (req, res) => {
    const { id } = req.params

    const userAcess = req?.authenticatedUser ?? 'visitante'

    if (
      (userAcess.id !== req.params.id && userAcess.role !== 'admin') ||
      !userAcess
    ) {
      return res.status(401).json({ error: 'Unauthorized' })
    } else {
      usersModel.deleteUser(id)
    }

    const deletedUser = usersModel.findById(id)

    res.status(200).json({ ...deletedUser, password: undefined })
  },

  updatePassword: (req, res) => {
    const { id } = req.params
    const { password, newPassword } = req.body

    const user = usersModel.updatePassword(id, password, newPassword)

    res.status(201).json(user.id)
  },

  updateRole: (req, res) => {
    const { id } = req.params
    const { role } = req.body

    const userUpdating = req?.authenticatedUser

    const user = usersModel.updateRole(id, role, userUpdating.id)

    res.status(201).json(user.id)
  },
}
