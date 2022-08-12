const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(express.static(__dirname + "/build"));

app.get("*", (req, res) => {
  return res.sendFile("/build/index.html", { root: __dirname + "/" });
});

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  const { username, roomID } = socket.handshake.query;
  socket.join(roomID);
  io.to(roomID).emit("user connect", { username });

  socket.on("message", (msg) => {
    io.to(roomID).emit("message", msg);
  });

  socket.on("disconnect", () => {
    io.to(roomID).emit("user disconnect", { username });
  });
});
server.listen(PORT, () => console.log("listening"));
