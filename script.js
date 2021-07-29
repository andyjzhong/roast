'use-strict';

console.warn("JS loaded.");

const menuItemBtn = document.querySelector(".menu-item");

menuItemBtn.addEventListener("click", function() {
    console.log("Button was clicked.");
})

fetch("/sampleData.json")
.then((res) => {
  return res.json();
})
.then(function(res) {
    console.log("Retrieved data successfully.", res);
})
.catch(function(err) {
    console.log("Failed to retrieve data.", err);
})
