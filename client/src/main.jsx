import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./reducers/store.js";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // Light blue for primary buttons
    },
    secondary: {
      main: "#f48fb1", // Pink for secondary elements
    },
    background: {
      default: "#121212", // Dark background for the whole app
      paper: "#1e1e1e", // Slightly lighter dark for cards and paper elements
    },
    text: {
      primary: "#ffffff", // White text
      secondary: "#b0bec5", // Gray text for secondary content
    },
    action: {
      hover: "#333333", // Darker color on button hover
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Rounded corners for buttons
          textTransform: "none", // No uppercase for button text
        },
        containedPrimary: {
          backgroundColor: "#90caf9", // Main color for primary button
          color: "#121212", // Dark text color for contrast
          "&:hover": {
            backgroundColor: "#64b5f6", // Slightly darker blue on hover
          },
        },
        containedSecondary: {
          backgroundColor: "#f48fb1",
          color: "#121212",
          "&:hover": {
            backgroundColor: "#f06292",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h5: {
          color: "#90caf9", // Light blue for headers
        },
        body1: {
          color: "#e0e0e0", // Light gray for body text
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          borderColor: "#636262", // Dark gray border color
          borderWidth: "1px",
        },
      },
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
