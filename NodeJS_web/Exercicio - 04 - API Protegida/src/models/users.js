const users = [
  {
    id: '1',
    username: 'isaac',
    password: '123456',
    email: 'isaac@gmail.com',
    role: 'admin',
  },
  {
    id: '2',
    username: 'jose',
    password: 'abc123',
    email: 'jose@gmail.com',
    role: 'user',
  },
  {
    id: '3',
    username: 'luisa',
    password: 'qwerty',
    email: 'luisa@gmail.com',
    role: 'user',
  },
]

module.exports = {
  findAll: () => users,

  findById: (id) => users.find((u) => u.id === id),

  findByUsername: (username) => users.find((u) => u.username === username),

  findByEmail: (email) => users.find((u) => u.email === email),

  newUser: (username, email, password) => {
    const alreadyExists = users.find((u) => u.email === email)

    if (alreadyExists) {
      return null
    }

    const newUser = {
      id: Date.now().toString(26) + Math.random().toString(26),
      username,
      email,
      password,
      role: 'user',
    }

    users.push(newUser)
    return newUser
  },

  updateUser: (idUpdated, password, role, idUpdating) => {
    const userUpdated = this.findById(idUpdated)
    const userUpdating = this.findById(idUpdating)

    if (!userUpdated) {
      return null
    }

    if (password) {
      userUpdated.password = password
    }

    if (userUpdating.role === 'admin' && role) {
      userUpdated.role = role
    }
    return userUpdated
  },

  deleteUser: (id) => {
    const user = users.find((u) => u.id === id)

    if (!user) {
      return null
    }

    const index = users.indexOf(user)

    const newList = users.splice(index, 1)

    return newList
  },

  loginMethod: (email, password) => {

    const validLogin = users.find((u) => u.email === email && u.password === password)

    if (!validLogin) {
      return null
    }

    return validLogin
  },
}
