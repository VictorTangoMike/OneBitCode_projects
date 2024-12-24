const users = require('../models/users')

module.exports = {
  deleteUser: (req, res) => {
    const { id } = req.params

    const newList = users.deleteUser(id)

    if (!newList) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(201).json(newList)
  },
}
