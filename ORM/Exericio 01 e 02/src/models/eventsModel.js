const { v4: uuidv4 } = require('uuid')
const { query } = require('../database/pool')
const customerModel = require('./customerModel')

class Event {
  constructor(eventRow) {
    this.id = eventRow.id
    this.name = eventRow.name
    this.eventDate = new Date(eventRow.event_date)
    this.totalTickets = +eventRow.total_tickets
    this.soldTickets = +eventRow.sold_tickets
    this.isActive = eventRow.is_active
    this.createdAt = new Date(eventRow.created_at)
    this.updatedAt = new Date(eventRow.updated_at)
  }

  static async createEvent(name, eventDate, totalTickets) {
    if (totalTickets <= 0) {
      throw new Error('Total tickets must be greater than 0')
    }

    const id = uuidv4()
    await query(
      `
      INSERT INTO events (id, name, event_date, total_tickets)
      VALUES ($1, $2, $3, $4);
      `,
      [id, name, eventDate, totalTickets]
    )

    return new Event({
      id,
      name,
      event_date: eventDate,
      total_tickets: totalTickets,
    })
  }

  static async getAllEvents() {
    const result = await query(`SELECT * FROM events;`)
    return result.rows.map((row) => new Event(row))
  }

  static async getEventById(id) {
    const { rows } = await query(
      `
      SELECT id, name, event_date, total_tickets, sold_tickets, is_active, created_at, updated_at
      FROM events
      WHERE id = $1;
      `,
      [id]
    )
    return rows[0]
  }

  static async getAllCustomersByEventId(eventId) {
    const { rows } = await query(
      `
      SELECT C.id, C.name, C.email
      FROM customers C
      INNER JOIN transactions T ON T.customer_id = C.id
      WHERE T.event_id = $1;
      `,
      [eventId]
    )

    return rows.map((row) => new customerModel(row))
  }

  static async activateEvent(id) {
    const event = await Event.getEventById(id)
    if (!event) throw new Error('Event not found')

    await query(
      `
      UPDATE events
      SET is_active = TRUE, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1;
      `,
      [id]
    )

    return event
  }

  static async deactivateEvent(id) {
    const event = await Event.getEventById(id)
    if (!event) throw new Error('Event not found')

    await query(
      `
      UPDATE events
      SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1;
      `,
      [id]
    )

    return event
  }
}

module.exports = Event
