require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
})

async function query(queryString, params = [], callback) {
  try {
    const result = await pool.query(queryString, params, callback)
    return result
  } catch (error) {
    console.error('Database Query Error:', error.message)
    throw new Error('Database operation failed')
  }
}

module.exports = { query }
