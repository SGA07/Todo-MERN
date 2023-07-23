const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    userId: mongoose.Schema.ObjectId,
    todos: [
      {
        checked: Boolean,
        text: String,
        id: String,
      },
    ],
  },
  { timestamps: true }
);
const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
