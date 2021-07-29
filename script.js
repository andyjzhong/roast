'use-strict';

console.warn("JS loaded.");

const menuItemBtn = document.querySelector(".menu-item");
const cancelOrderBtn = document.querySelector(".cancel-order");
const totalBillBox = document.querySelector("#total-bill-box");
const tabArea = document.querySelector(".tab-area");
let activeOrder = [];
let totalBill = "0";

// Calculate total bill
const calcTotalBill = () => {
    let orderPricesArray = activeOrder.map(function(food) {
        return food.price;
    });

    console.log(orderPricesArray);

    totalBill = orderPricesArray.reduce(function(acc, price) {
        return acc += price
    }, 0)

    console.log(totalBill);
    displayTotalBill()
}

// Display the total bill to user
const displayTotalBill = () => {
    totalBillBox.innerText = totalBill;
}

// Cancels the order and clears tab
const cancelOrder = () => {
    // Needs to remove all child elements from the tab area too.
    tabArea.innerHTML = "";
    activeOrder = [];
    calcTotalBill();
}

// Fetch menu data
async function getData() {
    fetch("./sampleData.json")
        .then((res) => {
            return res.json();
        })
        .then(function(res) {
            console.log("Retrieved data successfully.", res);
            menuItemSelected = res.result.menus[0].menu_sections[0].menu_items[0]
        })
        .catch(function(err) {
            console.log("Failed to retrieve data.", err);
        })
}


// Event Handlers
menuItemBtn.addEventListener("click", function() {
    activeOrder.push(menuItemSelected)
    console.log(activeOrder);

    let newItem = document.createElement("div");

    let html = `
      <div class="tabItem">
        <span>${menuItemSelected.name}</span>
        <span>${menuItemSelected.price}</span>
      </div>
      `

    newItem.innerHTML = `${html}`;
    document.querySelector(".tab-area").append(newItem)

    calcTotalBill();
})

getData();
cancelOrderBtn.addEventListener("click", cancelOrder)
