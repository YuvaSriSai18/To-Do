import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
import PasswordIcon from "@mui/icons-material/Password";
export default function SignIn() {
  return (
    <Box
      width="300px"
      display="flex"
      flexDirection="column"
      gap={2}
      margin="auto"
      mb={2}
    >
      <TextField
        type="email"
        placeholder="E-Mail"
        
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        type="password"
        placeholder="Password"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <Button
        variant="contained"
        sx={{ width: "120px", height: "40px", alignSelf: "center" }}
      >
        Sign In
      </Button>
    </Box>
  );
}
