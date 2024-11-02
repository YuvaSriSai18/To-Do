import {
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { taskTags } from "../../Constants/Tags";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { v4 as uuidv4 } from "uuid"; // Import the uuid function

export default function Task_Create() {
  // Initialize a single state object to hold all form data
  const [taskData, setTaskData] = useState({
    taskId: uuidv4(), // Generate a unique task ID
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    tags: [],
    subtasks: [],
    notes: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value, // Update the specific field in the taskData object
    }));
  };

  const handleTagChange = (event) => {
    const value = event.target.value;
    setTaskData((prev) => ({
      ...prev,
      tags: typeof value === "string" ? value.split(",") : value, // Update tags
    }));
  };

  const handleDeleteTag = (tagToDelete) => () => {
    setTaskData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToDelete), // Filter out the deleted tag
    }));
  };

  const handleSubtaskChange = (index) => (event) => {
    const newSubtasks = [...taskData.subtasks];
    newSubtasks[index] = event.target.value;
    setTaskData((prev) => ({
      ...prev,
      subtasks: newSubtasks, // Update the subtasks
    }));
  };

  const handleAddSubtask = () => {
    setTaskData((prev) => ({
      ...prev,
      subtasks: [...prev.subtasks, ""], // Add an empty string for a new subtask
    }));
  };

  const handleDeleteSubtask = (index) => () => {
    setTaskData((prev) => ({
      ...prev,
      subtasks: prev.subtasks.filter((_, i) => i !== index), // Remove the subtask at the specified index
    }));
  };

  const handleSubmit = () => {
    const formattedSubtasks = taskData.subtasks.map((subtask) => ({
      subtaskTitle: subtask,
      subTaskStatus: false, // Default status
    }));

    const finalTaskData = {
      ...taskData,
      subtasks: formattedSubtasks, // Format subtasks before sending
    };

    console.log(finalTaskData); // Log the final task data
    // Make your POST request here
    // Example: axios.post('/api/tasks', finalTaskData);
  };

  return (
    <Box display={"flex"} flexDirection={"column"} rowGap={2}>
      <Typography m={2} variant="h5" fontWeight={"600"} color="primary">
        New Task
      </Typography>
      <TextField
        name="title"
        label="Title"
        variant="outlined"
        required
        value={taskData.title}
        onChange={handleInputChange}
      />
      <TextField
        name="description"
        label="Description"
        multiline
        variant="outlined"
        required
        value={taskData.description}
        onChange={handleInputChange}
      />
      <Box display="flex" justifyContent="space-around">
        <TextField
          name="dueDate"
          variant="outlined"
          type="datetime-local"
          required
          value={taskData.dueDate}
          onChange={handleInputChange}
          sx={{
            width: "55%",
          }}
        />
        <FormControl sx={{ width: "40%" }}>
          <InputLabel>Priority</InputLabel>
          <Select
            name="priority"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={taskData.priority}
            label="Priority"
            onChange={handleInputChange}
          >
            <MenuItem value={"low"}>Low</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"high"}>High</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <FormControl sx={{ width: "100%" }}>
        <InputLabel>Tags</InputLabel>
        <Select
          multiple
          value={taskData.tags}
          onChange={handleTagChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={handleDeleteTag(value)}
                />
              ))}
            </Box>
          )}
        >
          {taskTags.map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box width={"100%"}>
        <Typography variant="h6" fontWeight={"700"} ml={3} mb={2}>
          Add Subtasks
        </Typography>
        {taskData.subtasks.map((subtask, index) => (
          <Box key={index} display="flex" alignItems="center" mb={1}>
            <TextField
              type="text"
              label={`SubTask ${index + 1}`}
              value={subtask}
              onChange={handleSubtaskChange(index)}
              sx={{ width: "80%", ml: 4 }}
            />
            <IconButton onClick={handleDeleteSubtask(index)} sx={{ ml: 2 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        ))}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton onClick={handleAddSubtask}>
            <AddIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        </Box>
      </Box>

      <TextField
        name="notes"
        label="Notes"
        multiline
        variant="outlined"
        value={taskData.notes}
        onChange={handleInputChange}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ width: "150px", alignSelf: "center", mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
}
