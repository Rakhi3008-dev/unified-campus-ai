const express = require("express");
const router = express.Router();

const books = require("../data/books.json");
const events = require("../data/events.json");
const menu = require("../data/menu.json");
const academics = require("../data/academics.json");

router.get("/", (req, res) => {

  res.json({
    books: books.length,
    events: events.length,
    menu: menu.length > 0 ? "Available" : "Unavailable",
    academics: academics.length
  });

});

module.exports = router;