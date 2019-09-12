const homepage = require("./homepage.js");
const itempage = require("./itempage.js");

console.log("i am index");


window.addEventListener("load", () => {
  homepage.setup();
  itempage.setup();
});
