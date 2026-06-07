const academics =
require("../data/academics.json");

function searchAcademic(query) {
  return academics.find((item) =>
    query.includes(item.topic)
  );
}

module.exports = {
  searchAcademic,
};