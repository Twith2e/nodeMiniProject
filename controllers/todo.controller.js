const todoModel = require("../models/todo.model");

const addTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      res
        .status(400)
        .send({ message: "All fields are required", status: false });
    } else {
      const todo = await todoModel.create(req.body);
      if (todo) {
        res
          .status(200)
          .send({ message: "Todo added successfully", status: true });
      }
    }
  } catch (error) {
    res.status(500).send({ message: error.message, status: false });
  }
};

const getTodo = async (req, res) => {
  try {
    const tasks = await todoModel.find();
    if (tasks.length > 0) {
      res.status(200).send({
        message: "Todo fetched successfully",
        status: true,
        data: tasks,
      });
      console.log(tasks);
    } else {
      res.status(400).send({
        message: "No tasks found",
        status: false,
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message, status: false });
  }
};

module.exports = { addTodo, getTodo };
