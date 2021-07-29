'use-strict';

console.warn("JS loaded.");

const menuItemBtn = document.querySelector(".menu-item");
const activeOrder = [];

fetch("/sampleData.json")
.then((res) => {
  return res.json();
})
.then(function(res) {
    console.log("Retrieved data successfully.", res);
    menuItemSelected = res.result.menus[0].menu_sections[0].menu_items[0]
    console.log(menuItemSelected);
})
.catch(function(err) {
    console.log("Failed to retrieve data.", err);
})

// Event Handlers
menuItemBtn.addEventListener("click", function() {
    console.log("Button was clicked.");
})
