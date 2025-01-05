const express = require('express')

const eventsController = require('../controllers/eventsController')
const customersController = require('../controllers/customersController')
const ticketsController = require('../controllers/ticketsController')

const routes = express.Router()

// routes Events
routes.post('/events/create', eventsController.create)
routes.get('/events/all', eventsController.getAll)
routes.get('/events/:eventId', eventsController.getEvent)
routes.get('/events/:eventId/customers', eventsController.getCustomers)
routes.put('/events/:eventId/active', eventsController.activate)
routes.put('/events/:eventId/inactive', eventsController.deactivate)

// routes Customers
routes.post('/customers/create', customersController.createCustomer)
routes.get('/customers/:customerId', customersController.getCustomerById)
routes.get(
  '/customers/:customerId/events',
  customersController.getAllEventsByCustomerId
)

// routes Tickets
routes.post('/tickets/sell', ticketsController.sellTickets)

module.exports = routes
