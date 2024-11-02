import React from "react";
import {
  Box,
  Typography,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

export default function ViewTaskDetails({ task }) {
  if (!task || !task.id) {
    return (
      <Box
        sx={{
          width: "85%",
          margin: "auto",
          padding: 2,
          border: "1px solid #ccc",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" color="error">
          Task not found.
        </Typography>
      </Box>
    );
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      default:
        return "success";
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        // margin: "auto",
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="600"
        fontSize={{ xs: "22px", sm: "24px" }}
        mb={2}
      >
        {task.title}
      </Typography>
      <Typography variant="body1" mb={2}>
        {task.description}
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={1}>
        <Chip
          label={`Status: ${task.status}`}
          color={task.status === "completed" ? "success" : "warning"}
          sx={{ marginRight: 1, fontSize: { xs: "12px", sm: "14px" } }}
        />
        <Chip
          label={`Priority: ${task.priority}`}
          color={getPriorityColor(task.priority)}
          sx={{ marginRight: 1, fontSize: { xs: "12px", sm: "14px" } }}
        />
        <Chip
          label={`Due Date: ${task.dueDate}`}
          sx={{ fontSize: { xs: "12px", sm: "14px" } }}
          color="info"
        />
      </Box>

      <Divider sx={{ marginY: 2 }} />

      <Typography variant="h6" mb={0.6}>
        Tags
      </Typography>
      <Box display="flex" gap={1} mb={2}>
        {task.tags?.length > 0 ? (
          task.tags.map((tag, index) => (
            <Chip key={index} label={tag} color="primary" />
          ))
        ) : (
          <Typography>No tags assigned</Typography>
        )}
      </Box>

      <Typography variant="h6">Subtasks:</Typography>
      {task.subtasks?.length > 0 ? (
        task.subtasks.map((subtask, index) => (
          <FormControlLabel
            key={index} // Add a unique key for each item
            value={subtask}
            control={<Checkbox checked={subtask.checked} />}
            label={subtask.title || `Subtask ${index + 1}`} // Display subtask title or default label
          />
        ))
      ) : (
        <Typography>No subtasks available</Typography>
      )}

      <Divider sx={{ marginY: 2 }} />

      <Typography variant="h6">Notes:</Typography>
      <Typography variant="body1" mb={2}>
        {task.notes || "No notes available"}
      </Typography>

      <Typography variant="h6">Reminders:</Typography>
      <List>
        {task.reminders?.length > 0 ? (
          task.reminders.map((reminder, index) => (
            <ListItem key={index}>
              <ListItemText primary={reminder} />
            </ListItem>
          ))
        ) : (
          <Typography>No reminders set</Typography>
        )}
      </List>
    </Box>
  );
}
