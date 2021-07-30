'use-strict';

const cancelOrderBtn = document.querySelector(".cancel-order");
const closeModalBtn = document.querySelector('#closeModal');
const discountBox = document.querySelector('#discount-box');
const discountBtn = document.querySelector('.add-discount');
const mealsTaxBox = document.querySelector('#meals-tax-box');
const menuItemBtn = document.querySelector(".menu-item");
const modal = document.querySelector('#modal');
const openModalBtn = document.querySelector('#openModal');
const orderNumText = document.querySelector('.orderNumText');
const sendOrderBtn = document.querySelector(".send-order");
const tabArea = document.querySelector(".tab-area");
const tableBody = document.querySelector(".table-body");
const totalBillBox = document.querySelector("#total-bill-box");
const subtotalBillBox = document.querySelector("#subtotal-bill-box");
let activeOrder = [];
let discount = 0;
let mealsTax = 0;
let orderHistory = [];
let orderNumber = 1;
let orderTotal = 0;
let subtotalBill = 0;

const deleteItem = (e) => {
    // Select the id of the item, and remove it from the array.
    console.log(e.target.outerHTML);
}



const addNewMenuItem = () => {
    activeOrder.push(menuItemSelected)
    console.log(activeOrder);

    let newItem = document.createElement("tr");

    let html = `
        <th scope="row">${activeOrder.length}</th>
        <td>${menuItemSelected.name}</td>
        <td>1</td>
        <td>$${menuItemSelected.price}</td>
        <td>$${menuItemSelected.price}</td>
        <td><button class="remove-btn btn btn-outline-danger btn-sm">Remove</button></td>
      `

    newItem.innerHTML = `${html}`;
    document.querySelector("tbody").append(newItem)

    document.querySelector('.remove-btn').addEventListener("click", deleteItem)

    calcSubtotal();
}

const addOrderHistory = () => {
    orderNumber++;
    orderNumText.innerText = orderNumber;
    console.warn("Active order is:::", activeOrder);
    orderHistory.push(activeOrder);
    console.warn("Order history is:::", orderHistory);

    clearOrder();
}

const calcSubtotal = () => {
    let orderPricesArray = activeOrder.map(function(food) {
        return food.price;
    });

    console.log(orderPricesArray);

    subtotalBill = orderPricesArray.reduce(function(acc, price) {
        return acc += price
    }, 0)

    subtotalBill = (Math.round(subtotalBill * 100) / 100).toFixed(2);
    subtotalBillBox.innerText = subtotalBill;
    calcMealsTax();
}

const calcDiscount = () => {
    discount = prompt("Enter a discount amount.")

    if (discount !== 0) {
        document.querySelector("#discount-box").innerText = (Math.round(discount * 100) / 100).toFixed(2);
    }
    calcMealsTax();
}

const calcMealsTax = () => {
    mealsTax = (Math.round(((subtotalBill - discount) * 0.0625) * 100) / 100).toFixed(2);
    mealsTaxBox.innerText = mealsTax;
    calcBill();
}

const calcBill = () => {
    orderTotal = Number(subtotalBill) - Number(discount) + Number(mealsTax);
    totalBillBox.innerText = orderTotal;
}

const clearOrder = () => {
    tableBody.innerHTML = "";
    activeOrder = [];
    discount = 0;
    discountBox.innerText = "0.00"
    mealsTax = 0;
    subtotalBill = 0;
    calcSubtotal();
}

const closeModal = () => {
    modal.style.display = 'none'
}

const openModal = () => {
    modal.style.display = 'block';
}

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

getData();

menuItemBtn.addEventListener("click", addNewMenuItem);
cancelOrderBtn.addEventListener("click", clearOrder);
closeModalBtn.addEventListener('click', closeModal);
openModalBtn.addEventListener('click', openModal);
discountBtn.addEventListener('click', calcDiscount);
sendOrderBtn.addEventListener("click", addOrderHistory);
