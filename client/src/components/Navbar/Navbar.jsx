import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { createTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import Home from "../../pages/Home/Home";
import Tasks from "../../pages/Tasks/Tasks";
import Tasks_Logo from "../../assets/Tasks_Logo.png";
import Auth_Modal from "../Auth/Auth_Modal";
import { useState, useMemo } from "react";
import ViewTaskDetails from "../../pages/Tasks/ViewTaskDetails";
import Not_Found from "../../pages/Not_Found/Not_Found";
import useOAuth from "../Auth/UseOAuth";
// Navigation configuration
const NAVIGATION = [
  {
    segment: "home",
    title: "Home",
    icon: <HomeIcon />,
  },
  {
    segment: "tasks",
    title: "Tasks",
    icon: <TaskAltIcon />,
  },
];

// Theme configuration
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Render component based on pathname
function renderComponent(pathname) {
  switch (pathname) {
    case "/home":
      return <Home />;
    case "/tasks":
      return <Tasks />;
    default:
      return <Not_Found />; // Default to Home if not found
  }
}

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {renderComponent(pathname)}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function NavLogo() {
  return <Box component="img" src={Tasks_Logo} borderRadius={5} mr={1} />;
}

function Navbar(props) {
  const { window } = props;
  const [session, setSession] = useState({
    user: {
      name: "Bharat Kashyap",
      email: "bharatkashyap@outlook.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });
useOAuth()
  // State to control modal visibility
  const [isModalOpen, setModalOpen] = useState(false);

  // Function to handle opening the modal
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Authentication handlers
  const authentication = useMemo(
    () => ({
      signIn: handleOpenModal, // Open the modal instead of redirecting to Google
      signOut: () => {
        setSession(null);
        console.log(`User Signed Out`);
      },
    }),
    []
  );

  const router = useDemoRouter("/home");
  const pathname = router?.pathname || "/home"; // Default to '/home' if router.pathname is undefined

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={window ? window() : undefined}
      branding={{
        title: "To Do",
        logo: <NavLogo />,
      }}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>

      {/* Modal for Authentication */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="auth-modal-title"
        aria-describedby="auth-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Auth_Modal onClose={handleCloseModal} />{" "}
          {/* Include Auth_Modal component */}
        </Box>
      </Modal>
    </AppProvider>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
