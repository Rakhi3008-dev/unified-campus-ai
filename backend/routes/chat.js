const express = require("express");
const router = express.Router();

const { askGemini } = require("../services/geminiService");
const { searchBook } = require("../services/libraryService");
const { getUpcomingEvent } = require("../services/eventService");
const { getTodayMenu } = require("../services/menuService");
const { searchAcademic } = require("../services/academicService");

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const lowerMessage = message.toLowerCase();

    let finalResponse = [];

    // ---------- LIBRARY ----------

    const foundBook = searchBook(lowerMessage);

    if (foundBook) {
      finalResponse.push(
        `📚 ${foundBook.title} by ${foundBook.author} is ${
          foundBook.available
            ? "available"
            : "currently unavailable"
        }.

Shelf: ${foundBook.shelf}`
      );
      
    }
    if (finalResponse.length > 0) {
        return res.json({
          success: true,
          response: finalResponse.join("\n\n"),
          source: "📚 Library MCP",
        });
      }
 
    // ---------- EVENTS ----------

    if (
      lowerMessage.includes("event") ||
      lowerMessage.includes("hackathon") ||
      lowerMessage.includes("workshop")
    ) {
        console.log(getUpcomingEvent);

const event = getUpcomingEvent();
     

      finalResponse.push(
        `🎉 ${event.name}

Date: ${event.date}
Time: ${event.time}
Venue: ${event.venue}`
      );
      sources.push("🎉 Events MCP");
    }

    // ---------- MENU ----------

    if (
      lowerMessage.includes("menu") ||
      lowerMessage.includes("breakfast") ||
      lowerMessage.includes("lunch") ||
      lowerMessage.includes("dinner")
    ) {
      const todayMenu = getTodayMenu();

      finalResponse.push(
`🍽️ Today's Menu

Breakfast: ${todayMenu.breakfast}

Lunch: ${todayMenu.lunch}

Dinner: ${todayMenu.dinner}`
      );
      sources.push("🍽️ Cafeteria MCP");
    }

    // ---------- ACADEMICS ----------

    const academic = searchAcademic(lowerMessage);

    if (academic) {
      finalResponse.push(
        `📖 ${academic.answer}`
      );
    }

    // ---------- RETURN CAMPUS SERVICES ----------

    if (finalResponse.length > 0) {
      return res.json({
        success: true,
        response: finalResponse.join("\n\n"),
        source: "🏫 Campus Services MCP",
      });
    }

    // ---------- GEMINI ----------

    const response =
    await askGemini(message);
  
  return res.json({
    success: true,
    response,
    source: "🤖 Gemini Fallback",
  });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;
