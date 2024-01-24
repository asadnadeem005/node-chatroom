import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);
const io = new Server(server);

// handle Socket.io request
io.on("connection", (socket) => {
  socket.on("chat", (message) => {
    io.emit("message", message);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("./public/index.html");
});

server.listen(3000, () => console.log("server listening on port:3000 "));
