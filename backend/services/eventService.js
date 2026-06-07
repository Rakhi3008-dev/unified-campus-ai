const events = require("../data/events.json");

function getEvents() {
  return events;
}

module.exports = {
  getEvents
};