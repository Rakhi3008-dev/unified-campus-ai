require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(
    cors({
      origin: "https://unified-campus-ai.onrender.com",
    })
  );
app.use(express.json());

console.log(process.env.GEMINI_API_KEY);
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