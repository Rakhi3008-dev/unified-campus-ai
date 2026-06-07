const events = require("../data/events.json");

function getUpcomingEvent() {
  return events[0];
}

module.exports = {
  getUpcomingEvent,
};