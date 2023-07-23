const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Todo = require("../models/todoModel");
const generateToken = require("../config/generateToken");

const todoUser = expressAsyncHandler(async (req, res) => {
  const todosItem = req.body;
  console.log(todosItem.newTodoList);
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
  console.log(todos);
  if (!todos) {
    await Todo.create({
      userId: user._id,
      todos: todosItem.newTodoList,
    });
  } else {
    todos.todos = todosItem.newTodoList;
    await todos.save();
  }

  res.json(todos);
});

const registerUser = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const { userName, password } = req.body;

  if (!userName || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
  const UserExists = await User.findOne({ userName });
  if (UserExists) {
    res.status(400);
    throw new Error("User already Exists");
  }
  const user = await User.create({
    userName,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("failed to create user");
  }
});

const authUser = expressAsyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("invalid username or password");
  }
});
module.exports = { registerUser, authUser, todoUser };
