// GoogleSignIn.js
import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { useSelector, useDispatch } from "react-redux";
import { setUserData, clearUserData } from "../../reducers/auth/authSlice";
export default function GoogleSignIn() {
  const dispatch = useDispatch();

  // Function to generate the Google login URL with necessary parameters
  const googleLoginUrl = () => {
    const params = new URLSearchParams({
      client_id:
        "887297308007-826g6pj5if56ospombqn44b8dngr2ki4.apps.googleusercontent.com",
      redirect_uri: "http://localhost:5173",
      response_type: "code",
      scope:
        "openid profile email https://www.googleapis.com/auth/classroom.coursework.me.readonly https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.courses.readonly",
      access_type: "offline",
      prompt: "consent",
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  };

  // Function to handle redirection to Google login
  const handleSignIn = () => {
    window.location.href = googleLoginUrl();
  };
  return (
    <Box>
      <Button
        onClick={handleSignIn}
        variant="contained"
        startIcon={<GoogleIcon />}
      >
        Sign In with Google
      </Button>
    </Box>
  );
}
