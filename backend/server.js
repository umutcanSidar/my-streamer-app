const express = require("express");
const socket = require("socket.io");
const mongoose = require("mongoose");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes");
const { verifyToken } = require("./helpers/middleware");

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

mongoose.connect(process.env.DB_CONNECT);

app.use(cors());
app.use(express.json());

app.get("/v1/api", (req, res) => {
  res.send("REST API");
});

authRoutes(app);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

const server = http.createServer(app);
const io = socket(server);

io.on("connection", (socket) => {
  console.log("A user connected");
  // Mesaj alma
  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    // Mesajı tüm kullanıcılara gönderme
    io.emit("message", msg);
  });

  // Kullanıcı bağlantısı koptuğunda
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.listen(port, () => console.log("The server has been started!"));
