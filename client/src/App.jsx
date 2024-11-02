import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ViewTaskDetails from "./pages/Tasks/ViewTaskDetails";

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/view-task-details/:id" element={<ViewTaskDetails />} />
        </Routes>
    </>
  );
}

export default App;
