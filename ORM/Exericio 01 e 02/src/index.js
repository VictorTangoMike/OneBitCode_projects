require('dotenv').config()

const express = require('express')
const routes = require('./routes/router')

const app = express()

app.use(express.json())

app.use(routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`)
})
