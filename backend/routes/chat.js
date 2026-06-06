const express = require("express");
const router = express.Router();

const askGemini = require("../services/aiAgent");
const books = require("../data/books.json");

router.post("/", async (req, res) => {
    try {
        const { message } = req.body;

        // Library Tool
        if (message.toLowerCase().includes("book") ||
            message.toLowerCase().includes("library")) {

            const foundBook = books.find(book =>
                message.toLowerCase().includes(
                    book.title.toLowerCase()
                )
            );

            if (foundBook) {
                return res.json({
                    success: true,
                    response:
                        `${foundBook.title} by ${foundBook.author} is ${
                            foundBook.available
                                ? "available"
                                : "currently unavailable"
                        }. Shelf: ${foundBook.shelf}`
                });
            }

            return res.json({
                success: true,
                response: "Sorry, I couldn't find that book."
            });
        }

        // Default AI
        const response = await askGemini(message);

        res.json({
            success: true,
            response
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

module.exports = router;