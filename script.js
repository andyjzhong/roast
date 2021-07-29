'use-strict';

console.warn("JS loaded.");

const cancelOrderBtn = document.querySelector(".cancel-order");
const closeModalBtn = document.querySelector('#closeModal');
const menuItemBtn = document.querySelector(".menu-item");
const modal = document.querySelector('#modal');
const openModalBtn = document.querySelector('#openModal');
const sendOrderBtn = document.querySelector(".send-order");
const tabArea = document.querySelector(".tab-area");
const tableBody = document.querySelector(".table-body");
const totalBillBox = document.querySelector("#total-bill-box");
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

// Clears the order and clears tab-area and activeOrder
const clearOrder = () => {
    // Needs to remove all child elements from the tab area too.
    tableBody.innerHTML = "";
    activeOrder = [];
    calcTotalBill();
}

const closeModal = () => {
    modal.style.display = 'none'
}

const openModal = () => {
    modal.style.display = 'block';
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

    let newItem = document.createElement("tr");

    let html = `
        <th scope="row">${activeOrder.length}</th>
        <td>${menuItemSelected.name}</td>
        <td>1</td>
        <td>$${menuItemSelected.price}</td>
        <td>$${menuItemSelected.price}</td>
      `

    newItem.innerHTML = `${html}`;
    document.querySelector("tbody").append(newItem)

    calcTotalBill();
})

getData();
cancelOrderBtn.addEventListener("click", clearOrder)
closeModalBtn.addEventListener('click', closeModal)
openModalBtn.addEventListener('click', openModal)

// TODO: This will later need to create a new object of existing orders as well so we can call it back.
sendOrderBtn.addEventListener("click", clearOrder)
