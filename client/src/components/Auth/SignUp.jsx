import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
import PasswordIcon from "@mui/icons-material/Password";
export default function SignUp() {
  return (
    <>
      <Box
        width="300px"
        display="flex"
        flexDirection="column"
        gap={2}
        margin="auto"
        mb={2}
      >
        <TextField
          type="text"
          placeholder="Name"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon />
                </InputAdornment>
              ),
            },
          }}
        />
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
          sx={{ width: "150px", height: "45px", alignSelf: "center" }}
        >
          Sign Up
        </Button>
      </Box>
    </>
  );
}
