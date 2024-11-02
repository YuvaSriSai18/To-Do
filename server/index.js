// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5530;

// Enable CORS for requests from the client origin
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

app.use(express.json()); // Parses incoming JSON requests

// Endpoint to handle Google OAuth callback and exchange the authorization code for an access token
app.post("/auth/google", async (req, res) => {
  const authorizationCode = req.body.code; // Authorization code sent from client

  if (!authorizationCode) {
    return res.status(400).json({ error: "Authorization code is required" });
  }

  try {
    // Exchange the authorization code for an access token
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code: authorizationCode,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: "http://localhost:5173",
        grant_type: "authorization_code",
      }
    );
    if(!tokenResponse.data){
      console.log(`No Token response`)
      return
    }
    console.log(tokenResponse.data);
    const accessToken = tokenResponse.data.access_token;
    if (!accessToken) {
      console.log(`Access Token is not there`);
      return
    }
    // Use the access token to get user information
    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if(!userInfoResponse){
      console.log(`User data is not there`)
      return 
    }
    const userData = userInfoResponse.data;

    // Generate JWT token from user data
    const jwtAccessToken = jwt.sign(userData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    if(!jwtAccessToken){
      console.log(`No JWT Token`)
      return
    }
    // Send both JWT access token and user data in a single response
    res.json({ token: jwtAccessToken  , user : userData});
  } catch (error) {
    console.error(
      "Error exchanging authorization code or fetching data:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ error: "Failed to authenticate user or retrieve data" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
