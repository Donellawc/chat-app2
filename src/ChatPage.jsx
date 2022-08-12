import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useSocket from "./useSocket.js";

function ChatPage({ currentUser, currentColor }) {
  const [message, setMessage] = useState("");
  const { roomID } = useParams();
  const { messages, sendMessage } = useSocket(
    roomID,
    currentUser,
    currentColor
  );
  return (
    <div>
      <h2>Chat Page</h2>
      <div>
        <label htmlFor="message">Message</label>
        <input
          id="message"
          value={message}
          type="text"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={() => {
            if (message) {
              sendMessage(message);
              setMessage("");
            }
          }}
        >
          Send
        </button>
      </div>
      <div className="messages">
        {messages.map((val, idx) => (
          <div key={idx}>
            <b style={{ color: val.color }}>{val.username}:</b>
            {val.body}
          </div>
        ))}
      </div>
    </div>
  );
}
export default ChatPage;