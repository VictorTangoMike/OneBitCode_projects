const { query } = require('../database/pool')
const { v4: uuidv4 } = require('uuid')

class Customer {
  constructor(customerRow) {
    this.id = customerRow.id
    this.name = customerRow.name
    this.email = customerRow.email
    this.createdAt = new Date(customerRow.created_at)
    this.updatedAt = new Date(customerRow.updated_at)
  }

  static async createCustomer(name, email) {
    const id = uuidv4()
    const { rows } = await query(
      'INSERT INTO customers (id, name, email) VALUES ($1, $2, $3) RETURNING *',
      [id, name, email]
    )
    return new Customer(rows[0])
  }

  static async getCustomerById(id) {
    const { rows } = await query('SELECT * FROM customers WHERE id = $1', [id])
    return new Customer(rows[0])
  }

  static async getAllEventsByCustomerId(customerId) {
    const { rows } = await query(
      `
      SELECT DISTINCT 
        E.id, 
        E.name, 
        E.event_date, 
        -- Comented Lines 
        -- E.total_tickets, 
        -- E.sold_tickets, 
        -- E.is_active, 
        -- E.created_at, 
        -- E.updated_at,
        T.tickets_quantity
      FROM events E
      INNER JOIN transactions T ON T.event_id = E.id
      WHERE T.customer_id = $1;
      `,
      [customerId]
    )

    return rows
  }
}

module.exports = Customer
