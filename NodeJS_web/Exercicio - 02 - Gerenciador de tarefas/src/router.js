const express = require('express')
const tasksController = require('./controllers/taskController')

const router = express.Router()

// Route index
router.get('/', tasksController.index)

// Route planners
router.get('/planners', tasksController.showAllPlanners)

// Routes New planner
router.get('/newPlanner', tasksController.createPlannerPage)
router.post('/newPlanner/create', tasksController.createPlanner)

// Routes planner
router.get('/planner/:id', tasksController.showPlanner)
router.post('/planner/:id/newTask', tasksController.createTask)
router.post('/planner/:id/completeTask/:taskId', tasksController.completeTaskPost)
router.post('/planner/:id/undoTask/:taskId', tasksController.undoTaskPost)
router.post('/planner/:id/deleteTask/:taskId', tasksController.deleteTask)
router.post('/planner/:id/delete', tasksController.deletePlanner)

module.exports = router