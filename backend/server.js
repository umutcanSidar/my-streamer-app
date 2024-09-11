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

app.listen(port, () => console.log("The server has been started!"));
