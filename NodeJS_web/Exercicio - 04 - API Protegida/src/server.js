require('dotenv').config()

const express = require('express')
const errorMiddleware = require('./middlewares/error-middleware')
const routes = require('./routes')

const app = express()

app.use(express.json())

app.use(routes)

app.use(errorMiddleware)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`)
})
