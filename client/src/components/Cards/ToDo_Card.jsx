import React, { useState } from "react";
import { Box, Chip, Typography, Button, Modal } from "@mui/material";
import ViewTaskDetails from "../../pages/Tasks/ViewTaskDetails";
import useMediaQuery from "@mui/material/useMediaQuery";
export default function ToDo_Card({ task }) {
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");
  // Function to get color based on priority
  const getPriorityColor = () => {
    switch (task.priority) {
      case "high":
        return "error"; // Red
      case "medium":
        return "warning"; // Yellow
      case "low":
        return "success"; // Green
      default:
        return "default";
    }
  };

  return (
    <Box
      width="85%"
      borderRadius={3}
      border="1px solid #636262"
      display="flex"
      justifyContent="space-between"
      alignSelf="center"
    >
      <Box display="flex" flexDirection="row" p={2} marginRight="auto">
        <Box width="10px" bgcolor="#524f4f" ml={1.1} mr={3} borderRadius={7} />

        <Box display="flex" flexDirection="column" textAlign="left">
          <Typography
            variant="h5"
            fontSize={{ xs: "16px", sm: "20px" }}
            fontWeight="600"
            mb={1}
          >
            {task.title}
          </Typography>
          <Typography
            variant="body1"
            fontSize={{ xs: "12px", sm: "14px" }}
            fontWeight="300"
            mb={0.4}
          >
            {task.description}
          </Typography>
          <Chip
            label={`Due: ${task.dueDate}`}
            sx={{
              fontSize: { xs: "11px", sm: "12px" },
              fontWeight: "500",
              mb: 1,
              width: "fit-content",
              mt: 1,
            }}
            color={getPriorityColor()}
          />
          <Box display="flex" mt={0.5}>
            <Typography variant="h6" fontWeight="600" fontSize="16px" mr={2}>
              Tags
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={0.4}>
              {task.tags?.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                />
              ))}
            </Box>
          </Box>
          {!matches && (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Button
                variant="outlined"
                sx={{ height: { xs: "39px" } , mt:2 , width:'130px' }}
                onClick={() => setOpen(true)}
              >
                View Details
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {matches && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          mr={2}
        >
          <Button
            variant="outlined"
            sx={{ height: { xs: "35px" } }}
            onClick={() => setOpen(true)}
          >
            View Details
          </Button>
        </Box>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ overflow: "scroll" }}
      >
        <Box
          sx={{
            maxWidth: {xs:"100%" , sm:'80%'},
            margin: "auto",
            mt: 5,
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
          }}
        >
          <ViewTaskDetails task={task} />
        </Box>
      </Modal>
    </Box>
  );
}
