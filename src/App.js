import "./App.css";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import HomePage from "./HomePage";
import ChatPage from "./ChatPage";
import { useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/home"
            element={
              <HomePage
                setCurrentUser={setCurrentUser}
                setCurrentColor={setCurrentColor}
              />
            }
          />
          <Route
            path="/chat/:roomID"
            element={
              <ChatPage currentUser={currentUser} currentColor={currentColor} />
            }
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
