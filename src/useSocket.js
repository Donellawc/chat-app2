import socketIoClient from "socket.io-client";
import { useState, useCallback, useEffect, useRef } from "react";
const useSocket = (roomID, username, color) => {
  const [messages, setMessages] = useState([]);
  //! Each message is an object that has the following keys:
  //! {username: "SOMETHING", body: "MESSAGE TO DISPLAY", color: "HEX COLOR CODE"}
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = socketIoClient("http://localhost:8080", {
      query: { username, roomID },
    });
    socketRef.current.on("user connect", ({ username }) => {
      let newMsg = {
        username: "SERVER",
        body: `${username} has joined the room`,
        color: "#00FF00",
      };
      setMessages((curr) => [...curr, newMsg]);
    });
    socketRef.current.on("user disconnect", ({ username }) => {
      let newMsg = {
        username: "SERVER",
        body: `${username} has left the room`,
        color: "#00FF00",
      };
      setMessages((curr) => [...curr, newMsg]);
    });
    socketRef.current.on("message", (msg) => {
      setMessages((curr) => [...curr, msg]);
    });
    return () => socketRef.current.disconnect();
  }, []);
  const sendMessage = useCallback(
    (body) => {
      socketRef.current.emit("message", { color, username, body });
    },
    [color, username]
  );
  return { messages, sendMessage };
};
export default useSocket;