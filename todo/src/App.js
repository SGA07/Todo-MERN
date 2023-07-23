import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Register from "./page/Startup/Register";
// import WelcomePage from "./page/Startup/WelcomePage";
import Todo from "./components/Todo/Todo";
import WelcomePage from "./page/Startup/WelcomePage";

export const Credentials = createContext();

function App() {
  const userName = localStorage.getItem("userName");
  const password = localStorage.getItem("password");
  const credentialsState = useState({ userName, password });
  console.log(credentialsState);
  return (
    <div className="App">
      <Credentials.Provider value={credentialsState}>
        <Router>
          <Switch>
            <Route exact path="/">
              <WelcomePage />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/todo">
              <Todo />
            </Route>
          </Switch>
        </Router>
      </Credentials.Provider>
    </div>
  );
}

export default App;
