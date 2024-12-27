const uuid = require('uuid')
const bcrypt = require('bcrypt')
const HttpError = require('../errors/HttpError')
const users = [
  {
    id: '1',
    username: 'isaac',
    password: '$2b$10$5lbhLMJKTlSZQBd2kXcCXuAJHT1QaAwf8tfThO896Vcn7.SzjBc3m',
    email: 'isaac@gmail.com',
    role: 'admin',
  },
]

module.exports = {
  findAll: () => users,

  findById: (id) => {
    const user = users.find((u) => u.id === id)
    if (!user) throw new HttpError(404, 'User not found')
    return user
  },

  findByEmail: (email) => users.find((u) => u.email === email),

  newUser: (username, email, password) => {
    const alreadyExists = users.find((u) => u.email === email)

    if (alreadyExists) {
      throw new HttpError(400, 'E-mail already exists')
    }

    const newUser = {
      id: uuid.v4(),
      username: username.trim(),
      email,
      password: bcrypt.hashSync(password, 10),
      role: 'user',
    }

    users.push(newUser)

    return newUser
  },

  adminNewUser: (username, email, password, role) => {
    const alreadyExists = users.find((u) => u.email === email)

    if (alreadyExists) {
      return null
    }

    const newUser = {
      id: uuid.v4(),
      username: username.trim(),
      email,
      password: bcrypt.hashSync(password, 10),
      role,
    }

    users.push(newUser)

    return newUser
  },

  updateRole: (idUpdated, role, userUpdating) => {
    if (!idUpdated || !role) {
      throw new HttpError(400, 'Please provide all fields')
    }

    if (!userUpdating) {
      throw new HttpError(401, 'Authentication is required')
    }

    const userUpdated = users.find((u) => u.id === idUpdated)

    if (userUpdating.role !== 'admin') {
      throw new HttpError(401, 'Unauthorized')
    }

    userUpdated.role = role

    return userUpdated
  },

  updatePassword: (id, password, newPassword) => {
    const user = users.find((u) => u.id === id)

    if (!user || !password) {
      throw new HttpError(400, 'Please provide all fields')
    }

    if (bcrypt.compareSync(password, user.password)) {
      user.password = bcrypt.hashSync(newPassword, 10)
    } else {
      throw new HttpError(401, 'Password invalid')
    }

    return user
  },

  deleteUser: (id) => {
    const user = users.find((u) => u.id === id)

    if (!user) {
      throw new HttpError(404, 'User not found')
    }

    const index = users.indexOf(user)

    const newList = users.splice(index, 1)

    return [newList]
  },

  loginMethod: (email, password) => {
    const validUser = users.find((u) => u.email === email)

    const validLogin =
      validUser && bcrypt.compareSync(password, validUser.password)
    if (!validLogin) {
      throw new HttpError(401, 'Invalid credentials')
    }

    return validUser
  },
}
