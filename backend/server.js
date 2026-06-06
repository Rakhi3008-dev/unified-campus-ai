require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


const libraryRoutes = require("./routes/library");
const chatRoutes = require("./routes/chat");


app.use("/api/library", libraryRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
    res.send("Campus AI Backend Running 🚀");
});

const PORT = 8001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});