const taskModel = require("../models/taskModel");

const tasksController = {
  // GET /
  index: (req, res) => {
    res.render("index");
  },

  // GET /planners
  showAllPlanners: (req, res) => {
    const planners = taskModel.getAllPlanners();

    res.render("planners", { planners });
  },

  // GET /newPlanner
  createPlannerPage: (req, res) => {
    res.render("newPlanner");
  },

  // POST /newPlanner/create
  createPlanner: (req, res) => {
    const { title } = req.body;

    if (title.length != 0 || title.trim() !== "") {

      taskModel.createPlanner(title);

      res.redirect("../planners");
    } else {
      res.render("newPlanner", { error: "Título não pode estar vazio" });
    }
  },

  // GET /planner/:id
  showPlanner: (req, res) => {
    const { id } = req.params;
    const planner = taskModel.getPlannerById(id);

    res.render("planner", { planner });
  },

  // POST /planner/planner:id/newtask
  createTask: (req, res) => {
    const { id } = req.params;
    const { description } = req.body;

    taskModel.createTask(id, description);

    res.redirect(`/planner/${id}`);
  },

  // POST planner/plannerId/completeTask/:taskId
  completeTaskPost: (req, res) => {
    const { id, taskId } = req.params;

    taskModel.completeTask(id, taskId);

    res.redirect(`/planner/${id}`);
  },

  // POST /:plannerId/undoTask/:taskId
  undoTaskPost: (req, res) => {
    const { id, taskId } = req.params;

    taskModel.undoTask(id, taskId);

    res.redirect(`/planner/${id}`);
  },

  // POST /planner/:id/deleteTask/:taskId
  deleteTask: (req, res) => {
    const { id, taskId } = req.params;

    taskModel.deleteTask(id, taskId);

    res.redirect(`/planner/${id}`);
  },

  // POST /planner/:id/delete
  deletePlanner: (req, res) => {
    const { id } = req.params;

    taskModel.deletePlanner(id);

    res.redirect("/planners");
  },
};

module.exports = tasksController;
