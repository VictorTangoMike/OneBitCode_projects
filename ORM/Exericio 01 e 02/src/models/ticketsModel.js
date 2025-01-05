const query = require('../database/pool')
const { v4: uuidv4 } = require('uuid')
const { Event } = require('./eventsModel')

class Ticket {
  static async sellTickets(eventId, customerId, numberTickets) {
    const event = await Event.getEventById(eventId)
    if (!event) throw new Error('Event not found')

    const currentDateTime = new Date()
    const eventDateTime = new Date(event.eventDate)

    if (eventDateTime < currentDateTime) {
      throw new Error('Event date has passed')
    }

    if (event.totalTickets < event.soldTickets + numberTickets) {
      throw new Error('Not enough tickets available')
    }

    await query(
      `
      UPDATE events
      SET sold_tickets = sold_tickets + $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2;
      `,
      [numberTickets, eventId]
    )

    const transactionId = uuidv4()
    await query(
      `
      INSERT INTO transactions (id, event_id, customer_id, tickets_quantity)
      VALUES ($1, $2, $3, $4);
      `,
      [transactionId, eventId, customerId, numberTickets]
    )
  }
}

module.exports = Ticket
