const express = require("express");
const todoRouter = express.Router();
const { addTodo, getTodo } = require("../controllers/todo.controller");

todoRouter.post("/add", addTodo);
todoRouter.get("/get", getTodo);

module.exports = todoRouter;
