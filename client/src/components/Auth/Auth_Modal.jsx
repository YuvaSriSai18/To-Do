import React, { useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import GoogleSignIn from "./GoogleSignIn";
export default function Auth_Modal() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      {/* <Modal> */}
      <TabContext value={value}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", width: "fit-content" }}
        >
          <TabList onChange={handleChange} sx={{ alignSelf: "center" }}>
            <Tab label="Sign In" value="1" />
            <Tab label="Sign Up" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box>
            <SignIn />
            <Box mt={1} mb={1}>
              <Divider>
                <Typography variant="h6" fontWeight="800" fontSize={"17px"}>
                  OR
                </Typography>
              </Divider>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <GoogleSignIn />  
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <SignUp />
          <Box mt={1} mb={1}>
            <Divider>
              <Typography variant="h6" fontWeight="800" fontSize={"17px"}>
                OR
              </Typography>
            </Divider>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <GoogleSignIn />
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
