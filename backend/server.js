const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/routes");
const { default: mongoose } = require("mongoose");
const Todo = require("../backend/models/todoModel");
const User = require("./models/userModel");
app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/user", userRoutes);
app.get("/api/user/todo", async (req, res) => {
  const todosItem = req.body;
  console.log("get", todosItem.newTodoList);
  //console.log(req.headers);
  const { authorization } = req.headers;

  const [, token] = authorization.split(" ");
  const [userName, password] = token.split(":");
  const user = await User.findOne({ userName });

  if (!user) {
    res.status(403);
    res.json({
      message: "invalid access",
    });
    throw new Error("invalid access");
  }

  const todos = await Todo.findOne({ userId: user._id });

  res.json(todos);
});
app.listen(5000, () => console.log("listening"));
