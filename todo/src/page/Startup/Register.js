import {
  Box,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../../components/Authentication/Login";
import SignUp from "../../components/Authentication/SignUp";
import React, { useContext } from "react";

function Register() {
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        d="flex"
        bg={"whatsapp.100"}
        p={4}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <h1 style={{ fontWeight: "bold", fontSize: "20px" }}>To-Do App</h1>
      </Box>
      <Box
        d="flex"
        bg={"whatsapp.100"}
        p={4}
        w="100%"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Tabs>
          <TabList>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>SignUp</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login></Login>
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Register;
