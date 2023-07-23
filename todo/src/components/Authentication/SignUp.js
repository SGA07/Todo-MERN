import {
  FormLabel,
  VStack,
  FormControl,
  Input,
  InputRightElement,
  Button,
  InputGroup,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useToast } from "@chakra-ui/react";
//import { useHistory } from "react-router-dom";
import axios from "axios";
import { Credentials } from "../../App";
function SignUp() {
  const [Show, setShow] = useState(false);
  const [userName, setUserName] = useState([]);
  const [password, setPassword] = useState([]);
  const [confirmPassword, setconfirmPassword] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [, setCredentials] = useContext(Credentials);

  const SubmitHandler = async () => {
    setLoading(true);
    if (!userName || !password) {
      toast({
        title: "Please enter all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = await axios.post(
        "http://localhost:5000/api/user",
        {
          userName,
          password,
        },
        config
      );
      setCredentials({ userName, password });
      console.log(data.data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("UserInfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  const handleClick = () => {
    setShow(!Show);
  };
  return (
    <VStack spacing={"10px"}>
      SignUp
      <FormControl id="username" isRequired>
        <FormLabel>UserName</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setUserName(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={Show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <InputRightElement width={"4.5rem"}>
            <Button h="1.5rem" size={"sm"} onClick={handleClick}>
              {Show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={Show ? "text" : "password"}
            placeholder="Confirm your password"
            onChange={(e) => setconfirmPassword(e.target.value)}
          ></Input>
          <InputRightElement width={"4.5rem"}>
            <Button h="1.5rem" size={"sm"} onClick={handleClick}>
              {Show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        onClick={SubmitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default SignUp;
