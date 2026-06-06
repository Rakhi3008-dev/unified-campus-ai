const express = require("express");
const router = express.Router();

const books = require("../data/books.json");

// Get all books
router.get("/", (req, res) => {
    res.json(books);
});

// Search by title
router.get("/search", (req, res) => {
    const query = req.query.title?.toLowerCase();

    const result = books.filter(book =>
        book.title.toLowerCase().includes(query)
    );

    res.json(result);
});

module.exports = router;