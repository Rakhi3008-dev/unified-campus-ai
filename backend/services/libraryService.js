const books = require("../data/books.json");

function searchBook(query) {
  return books.find(book =>
    query.toLowerCase().includes(
      book.title.toLowerCase()
    )
  );
}

module.exports = {
  searchBook
};