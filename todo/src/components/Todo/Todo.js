import React, { useContext, useEffect, useState } from "react";
import { Credentials } from "../../App";
import {
  Container,
  FormLabel,
  VStack,
  FormControl,
  Input,
  InputRightElement,
  Button,
  InputGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
//import bcrypt from "bcryptjs";

const Todo = () => {
  const [credentials, setCredentials] = useContext(Credentials);
  const [todo, setTodo] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [filter, setFilter] = useState("uncompleted");

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const password = localStorage.getItem("password");
    console.log(userName);
    console.log(password);
    setCredentials({ userName, password });
  }, []);

  const sendTodo = async (newTodoList) => {
    // const salt = await bcrypt.genSalt(10);
    // credentials.password = await bcrypt.hash(credentials.password, salt);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Basic ${credentials.userName}:${credentials.password}`,
        },
      };
      const data = await axios.post(
        "http://localhost:5000/api/user/todo",
        {
          newTodoList,
        },
        config
      );
    } catch (error) {}
  };
  useEffect(() => {
    fetch(`http://localhost:5000/api/user/todo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.userName}:${credentials.password}`,
      },
    })
      .then((response) => response.json())
      .then((todos) => {
        if (todos) {
          setTodo(todos.todos);
        }
      });
  }, []);
  const addTodo = () => {
    if (todoText !== "") {
      const newTodo = { checked: false, text: todoText };
      const newTodoList = [...todo, newTodo];
      setTodo([...todo, newTodo]);
      setTodoText("");
      sendTodo(newTodoList);
    }
  };

  const toggleToDo = (id) => {
    const newtodoList = [...todo];
    const todoItem = newtodoList.find((todo) => todo._id === id);
    todoItem.checked = !todoItem.checked;
    setTodo(newtodoList);
    sendTodo(newtodoList);
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const printTodos = () => {
    return todo.filter((todo) =>
      filter === "completed" ? todo.checked : !todo.checked
    );
  };
  const LogOut = () => {
    localStorage.removeItem("UserInfo");
    localStorage.removeItem("password");
    localStorage.removeItem("userName");
    setCredentials(null);
  };
  console.log(todo);
  return (
    <Container maxW={"xl"} centerContent>
      <Button
        colorScheme="blue"
        position={"fixed"}
        top={"1rem"}
        right={"3rem"}
        onClick={LogOut}
      >
        <Link to="/register">LogOut</Link>
      </Button>
      {credentials && (
        <>
          <h1>Welcome {credentials.userName} </h1>

          <FormControl id="task">
            <FormLabel>Task</FormLabel>
            <Input
              value={todoText}
              placeholder="Enter your task"
              onChange={(e) => {
                setTodoText(e.target.value);
              }}
            ></Input>
          </FormControl>
          <Button colorScheme="blue" width="100%" onClick={addTodo}>
            Add
          </Button>
          <br />
          <select
            value={filter}
            onChange={(e) => changeFilter(e.target.value)}
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
          >
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
          {todo.length
            ? printTodos().map((todo) => (
                <div key={todo._id}>
                  <input
                    onChange={() => toggleToDo(todo._id)}
                    checked={todo.checked}
                    type="checkbox"
                  ></input>
                  <label>{todo.text}</label>
                </div>
              ))
            : "no todo item"}
        </>
      )}
    </Container>
  );
};

export default Todo;
