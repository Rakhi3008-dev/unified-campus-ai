const menu = require("../data/menu.json");

function getMenu() {
  return menu[0];
}

module.exports = {
  getMenu
};