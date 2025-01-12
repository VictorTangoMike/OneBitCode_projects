const ticket = require('../models/ticketsModel')

const ticketsController = {
  sellTickets: async (req, res) => {
    const { eventId, customerId, numberTickets } = req.body
    try {
      await ticket.sellTickets(eventId, customerId, numberTickets)
      res.status(200).send('Tickets sold successfully')
    } catch (error) {
      res.status(400).send(error.message)
    }
  },
}

module.exports = ticketsController
