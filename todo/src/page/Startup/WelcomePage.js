import { Button } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Credentials } from "../../App";
import Todo from "../../components/Todo/Todo";
function WelcomePage() {
  const [credentials, setCredentials] = useContext(Credentials);

  const logout = () => {
    localStorage.removeItem("UserInfo");
    localStorage.removeItem("password");
    localStorage.removeItem("userName");
    setCredentials(null);
  };
  console.log(credentials);
  return (
    <div>
      {credentials.userName && <button onClick={logout}>Logout</button>}
      <h1>Welcome {credentials && credentials.userName}</h1>
      {!credentials.userName && <Link to="/register">Register</Link>}
      <br />
      {!credentials.userName && <Link to="/register">Login</Link>}
      {credentials.userName && <Todo />}
    </div>
  );
}

export default WelcomePage;
