'use-strict';

const cancelOrderBtn = document.querySelector(".cancel-order");
const closeModalBtn = document.querySelector('#closeModal');
const discountBtn = document.querySelector('.add-discount');
const mealsTaxBox = document.querySelector('#meals-tax-box');
const menuItemBtn = document.querySelector(".menu-item");
const modal = document.querySelector('#modal');
const openModalBtn = document.querySelector('#openModal');
const orderNumText = document.querySelector('.orderNumText');
const sendOrderBtn = document.querySelector(".send-order");
const tabArea = document.querySelector(".tab-area");
const tableBody = document.querySelector(".table-body");
const subtotalBillBox = document.querySelector("#subtotal-bill-box");
let activeOrder = [];
let discount = "0.00";
let orderNumber = 1;
let subtotalBill = "0";
let mealsTax = "0.00";

// Calculate subtotal
const calcSubtotal = () => {
    let orderPricesArray = activeOrder.map(function(food) {
        return food.price;
    });

    console.log(orderPricesArray);

    subtotalBill = orderPricesArray.reduce(function(acc, price) {
        return acc += price
    }, 0)

    subtotalBill = (Math.round(subtotalBill * 100) / 100).toFixed(2);
    console.log(subtotalBill);
    calcMealsTax();
    displaySubtotalBill();
}

const calcMealsTax = () => {
    mealsTax = (Math.round(((subtotalBill - discount) * 0.0625) * 100) / 100).toFixed(2);
    mealsTaxBox.innerText = mealsTax;
}

// Display the subtotal to user
const displaySubtotalBill = () => {
    subtotalBillBox.innerText = subtotalBill;
}

// Clears the order and clears tab-area and activeOrder
const clearOrder = () => {
    // Needs to remove all child elements from the tab area too.
    tableBody.innerHTML = "";
    activeOrder = [];
    calcSubtotal();
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
        <td><button class="btn btn-outline-danger btn-sm">Delete</button></td>
      `

    newItem.innerHTML = `${html}`;
    document.querySelector("tbody").append(newItem)

    calcSubtotal();
})

getData();
cancelOrderBtn.addEventListener("click", clearOrder)
closeModalBtn.addEventListener('click', closeModal)
openModalBtn.addEventListener('click', openModal)
discountBtn.addEventListener('click', function() {
    discount = prompt("Add discount.")

    if (discount !== 0) {
        document.querySelector("#discount-box").innerText = (Math.round(discount * 100) / 100).toFixed(2);
    }
    calcMealsTax();
})

// TODO: This will later need to create a new object of existing orders as well so we can call it back.
sendOrderBtn.addEventListener("click", clearOrder)
