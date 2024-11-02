import React, { useState } from "react";
import ToDo_Card from "../../components/Cards/ToDo_Card";
import { Box, Typography } from "@mui/material";
import { toDoList } from "../../Constants/To_Do_List";
import TasksHeader from "../../components/Tasks/TasksHeader";

export default function Tasks() {
  const [taskState, setTaskState] = useState("all"); // Manage task state for dropdown

  const handleTaskStateChange = (newState) => {
    setTaskState(newState);
  };

  // Optionally filter to-do list based on taskState if needed:
  const filteredToDoList = toDoList.filter(
    (task) => taskState === "all" || task.status === taskState
  );

  return (
    <>
      <TasksHeader
        taskState={taskState}
        handleTaskStateChange={handleTaskStateChange}
      />
      {filteredToDoList.length > 0 ? (
        <>
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            gap={2}
            margin="auto"
          >
            {filteredToDoList.map((task, i) => (
              <ToDo_Card task={task} key={i} />
            ))}
          </Box>
        </>
      ) : (
        <>
          <Typography>No Task Found</Typography>
        </>
      )}
    </>
  );
}
