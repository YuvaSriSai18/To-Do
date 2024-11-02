export const toDoList = [
  {
    id: 1,                        
    title: "Complete Project Report", 
    description: "Draft the final project report including all sections", // Optional detailed description
    status: "in progress",        // Status of the task (e.g., "not started", "in progress", "completed")
    priority: "high",             // Priority level (e.g., "low", "medium", "high")
    dueDate: "2024-11-10",        // Due date for the task
    createdAt: "2024-10-31",      // Date when the task was created
    tags: ["work", "project"],     // Array of tags for categorizing (e.g., "personal", "work")
    assignedTo: "John Doe",       // Optional person responsible for the task
    subtasks: [                   // Array of subtasks (if the main task has parts)
      { title: "Collect data", checked: false },
      { title: "Analyze data", checked: true },
    ],
    notes: "Meet with team on Nov 5 for review", // Optional notes section
    reminders: ["2024-11-09 10:00"], // Array of reminder dates and times
    completedAt: null             // Date when the task was completed
  },
  {
    id: 2,
    title: "Grocery Shopping",
    description: "Buy ingredients for dinner",
    status: "not started",
    priority: "medium",
    dueDate: "2024-11-01",
    createdAt: "2024-10-31",
    tags: ["personal", "errands"],
    assignedTo: null,
    subtasks: [
      { title: "Buy vegetables", checked: false },
      { title: "Buy spices", checked: true }
    ],
    notes: "",
    reminders: ["2024-11-01 09:00"],
    completedAt: null
  }
];
