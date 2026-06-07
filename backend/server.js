require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
app.use(express.json());


const libraryRoutes = require("./routes/library");
const chatRoutes = require("./routes/chat");
const eventRoutes = require("./routes/events");
const dashboardRoutes =
require("./routes/dashboard");

app.use("/api/library", libraryRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/events", eventRoutes);
app.use(
    "/api/dashboard",
    dashboardRoutes
  );  

app.get("/", (req, res) => {
    res.send("Campus AI Backend Running 🚀");
});

const PORT = 8001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});