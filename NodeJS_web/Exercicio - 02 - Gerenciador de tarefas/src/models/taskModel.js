let planners = [
  {
    id: "1",
    title: "List Task 1",
    tasks: [
      {
        id: "1",
        description: "Do something",
        completed: false,
      },
      {
        id: "2",
        description: "Do something else",
        completed: true,
      },
    ],
  },
];

const taskModel = {
  getAllPlanners: () => {
    return planners;
  },

  getPlannerById: (id) => {
    return planners.find((planner) => planner.id === id);
  },

  createPlanner: (title) => {
    if (title.length != 0 || title.trim() !== "") {
      const newPlanner = {
        id: Date.now().toString(36) + Math.random().toString(36),
        title,
        tasks: [],
      };

      taskModel.savePlanner(newPlanner);
    } else {
      console.log("Title cannot be empty");
    }
  },

  savePlanner: (planner) => {
    return planners.unshift(planner);
  },

  createTask: (id, taskDescription) => {
    const newTask = {
      id: Date.now().toString(26) + Math.random().toString(26),
      description: taskDescription,
      completed: false,
    };

    const planner = taskModel.getPlannerById(id);

    return planner.tasks.push( newTask );
  },

  getTaskById: (plannerId, taskId) => {
    const plannerList = planners.find((planner) => planner.id === plannerId);
    const task = plannerList.tasks.find((task) => task.id === taskId);

    return task;
  },

  completeTask: (plannerId, taskId) => {
    task = taskModel.getTaskById(plannerId, taskId);

    task.completed = true;
  },

  undoTask: (plannerId, taskId) => {
    task = taskModel.getTaskById(plannerId, taskId);

    task.completed = false;
  },

  deleteTask: (plannerId, taskId) => {
    const planner = planners.find((planner) => planner.id === plannerId);

    if (planner) {
      planner.tasks = planner.tasks.filter((task) => task.id !== taskId);
    }
    return planner;
  },

  deletePlanner: (plannerId) => {
    return (planners = planners.filter((planner) => planner.id !== plannerId));
  },
};

module.exports = taskModel;
