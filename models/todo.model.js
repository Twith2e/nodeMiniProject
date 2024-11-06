const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
});

const todoModel = mongoose.model("todo_collection", todoSchema);

module.exports = todoModel;
