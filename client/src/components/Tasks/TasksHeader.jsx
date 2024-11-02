import React from "react";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  Typography,
  IconButton,
  Modal,
} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import Task_Create from "./Task_Create";

function SelectBox({ taskState, handleTaskStateChange }) {
  return (
    <FormControl sx={{ width: { xs: "100%" }, p: 2 }}>
      <Select
        value={taskState}
        sx={{
          fontWeight: "700",
          textAlign: "left",
          borderRadius: 4,
          border: "0.5px solid #ccc",
        }}
        onChange={(event) => handleTaskStateChange(event.target.value)}
      >
        <MenuItem value="all" sx={{ borderRadius: 7 }}>
          All Tasks
        </MenuItem>
        <MenuItem value="in progress" sx={{ borderRadius: 7 }}>
          In Progress
        </MenuItem>
        <MenuItem value="completed" sx={{ borderRadius: 7 }}>
          Completed
        </MenuItem>
        <MenuItem value="overdue" sx={{ borderRadius: 7 }}>
          Over Due
        </MenuItem>
        <MenuItem value="not started" sx={{ borderRadius: 7 }}>
          Not Started
        </MenuItem>
      </Select>
    </FormControl>
  );
}

function CreateTaskBtn({ handleOpen }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      border="0.5px solid #ccc"
      borderRadius={4}
      p={2}
      height={"55px"}
      width={"fit-content"}
      onClick={handleOpen} // Pass handleOpen here
      sx={{ cursor: "pointer" }}
    >
      <Typography mr={1}>Create a Task</Typography>
      <AddCircleRoundedIcon sx={{ color: "#e0c810" }} />
    </Box>
  );
}

export default function TasksHeader({ taskState, handleTaskStateChange }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      display="flex"
      flexDirection="row"
      width="100%"
      justifyContent="space-around"
    >
      <Box width={{ xs: "45%", sm: "40%", md: "30%" }}>
        <SelectBox
          taskState={taskState}
          handleTaskStateChange={handleTaskStateChange}
        />
      </Box>
      <Box mt={2}>
        <CreateTaskBtn handleOpen={handleOpen} /> {/* Pass handleOpen as a prop */}
      </Box>
      <Box m={1} mt={2.2}>
        <IconButton
          sx={{
            borderRadius: 4,
            border: "0.5px solid #ccc",
            height: "fit-content",
            p: 1,
            width: "fit-content",
          }}
        >
          <FilterAltRoundedIcon sx={{ fontSize: "33px" }} />
        </IconButton>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          overflow:'scroll',
          mb:2
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: "100%", sm: "60%" },
            margin: 'auto',
            mt: 5,
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            
          }}
        >
          <Task_Create handleClose={handleClose} />{" "}
          {/* Pass handleClose to Task_Create if needed */}
        </Box>
      </Modal>
    </Box>
  );
}
