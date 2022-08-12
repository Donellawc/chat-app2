import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage({ setCurrentUser, setCurrentColor }) {
  const [roomID, setRoomID] = useState("");
  const [username, setUsername] = useState("");
  const [color, setColor] = useState("#000000");
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="roomID">Room ID</label>
        <input
          id="roomID"
          value={roomID}
          type="text"
          onChange={(e) => setRoomID(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="color">Chat Color</label>
        <input
          id="color"
          value={color}
          type="color"
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <button
        onClick={() => {
          if (roomID && username) {
            setCurrentUser(username);
            setCurrentColor(color);
            navigate(`/chat/${roomID}`);
          }
        }}
      >
        Join Chat Room
      </button>
    </div>
  );
}
export default HomePage;