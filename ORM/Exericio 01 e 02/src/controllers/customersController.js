const customer = require('../models/customerModel')

const customerController = {
  createCustomer: async (req, res) => {
    try {
      const { name, email } = req.body
      const newCustomer = await customer.createCustomer(name, email)
      res.status(201).json(newCustomer)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  },

  getCustomerById: async (req, res) => {
    try {
      const { customerId } = req.params
      const customerFound = await customer.getCustomerById(customerId)
      res.json(customerFound)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  },

  getAllEventsByCustomerId: async (req, res) => {
    try {
      const { customerId } = req.params
      const events = await customer.getAllEventsByCustomerId(customerId)
      res.json(events)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  },
}

module.exports = customerController
