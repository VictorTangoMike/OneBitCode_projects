const prisma = require('../database')

const User = {
  async create(req, res) {
    const { name, email } = req.body
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
      },
    })
    res.json(newUser)
  },

  async findAll(req, res) {
    const users = await prisma.user.findMany()
    res.json(users)
  },

  async findOne(req, res) {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    })
    res.json(user)
  },

  async update(req, res) {
    const { name, email } = req.body
    const updatedUser = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: name,
        email: email,
      },
    })
    res.json(updatedUser)
  },

  async delete(req, res) {
    const deletedUser = await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    })
    res.json(deletedUser)
  },
}

module.exports = User
