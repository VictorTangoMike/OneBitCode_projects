const eventModel = require('../models/eventsModel')

const eventsController = {
  create: async (req, res) => {
    const { name, eventDate, totalTickets } = req.body
    if (!name || !eventDate || !totalTickets) {
      return res.status(400).json({ message: 'Missing required information' })
    }
    const newEvent = await eventModel.createEvent(name, eventDate, totalTickets)
    res.status(201).json(newEvent)
  },

  getAll: async (req, res) => {
    const events = await eventModel.getAllEvents()
    res.json(events)
  },

  getEvent: async (req, res) => {
    const { eventId } = req.params
    const eventFound = await eventModel.getEventById(eventId)
    if (!eventFound) {
      return res.status(404).json({ message: 'Event not found' })
    }
    res.json(eventFound)
  },

  getCustomers: async (req, res) => {
    const { eventId } = req.params
    const customers = await eventModel.getAllCustomersByEventId(eventId)
    res.json(customers)
  },

  activate: async (req, res) => {
    const { eventId } = req.params
    const eventFound = await eventModel.getEventById(eventId)
    if (!eventFound) {
      return res.status(404).json({ message: 'Event not found' })
    }
    await eventModel.activateEvent(eventId)
    res.json({ message: 'Event activated' })
  },

  deactivate: async (req, res) => {
    const { eventId } = req.params
    const eventFound = await eventModel.getEventById(eventId)
    if (!eventFound) {
      return res.status(404).json({ message: 'Event not found' })
    }
    await eventModel.deactivateEvent(eventId)
    res.json({ message: 'Event deactivated' })
  },
}

module.exports = eventsController
