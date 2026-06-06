const express = require("express");
const router = express.Router();

const events = require("../data/events.json");

router.get("/", (req, res) => {
    res.json(events);
});

module.exports = router;