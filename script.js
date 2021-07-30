'use-strict';

const cancelOrderBtn = document.querySelector(".cancel-order");
const closeModalBtn = document.querySelector('#closeModal');
const discountBox = document.querySelector('#discount-box');
const discountBtn = document.querySelector('.add-discount');
const mealsTaxBox = document.querySelector('#meals-tax-box');
const menuItemBtn = document.querySelector(".menu-item");
const menuItemBtn2 = document.querySelector(".menu-item-2");
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

const renumberTable = () => {
    // let rowTarget = tableBody.children.item(0).children.item(0);
    // console.log("rowTarget", rowTarget);

    if (activeOrder.length > 0){
        let rowTargetText = tableBody.children.item(0).children.item(0).innerText;
        for (let i = 0; i < activeOrder.length; i++) {
            // console.error("rowTargetText", rowTargetText);
            let newRowNum = rowTargetText - 1;

            // console.warn("newRowNum", newRowNum);
            tableBody.children.item(i).children.item(0).innerText = newRowNum;
            rowTargetText++
        }
    }
}

const deleteItem = (e) => {
    removalCandidate = e.target.parentElement.parentElement.firstElementChild.innerHTML;
    rowIndex = removalCandidate - 1
    activeOrder.splice(rowIndex, 1)
    tableBody.children.item(rowIndex).remove();
    renumberTable();
    calcSubtotal();
}

const addNewMenuItem = (e) => {
    let index = breakfastMenu.findIndex(item => item.name === e.target.name);
    activeOrder.push(breakfastMenu[index]);
    console.log(activeOrder);

    let newItem = document.createElement("tr");

    let html = `
        <td class="trow" scope="row">${activeOrder.length}</th>
        <td>${e.target.name}</td>
        <td>1</td>
        <td>$${(Math.round(e.target.getAttribute("price") * 100) / 100).toFixed(2)}</td>
        <td>$${(Math.round(e.target.getAttribute("price") * 100) / 100).toFixed(2)}</td>
        <td>
            <button class="remove-btn btn btn-outline-danger btn-sm">
                <i class="far fa-trash-alt"></i>
            </button>
        </td>
      `

    newItem.innerHTML = `${html}`;
    document.querySelector("tbody").append(newItem)

    let allRemoveBtns = document.querySelectorAll('.remove-btn');
    allRemoveBtns.forEach(btn => btn.addEventListener("click", deleteItem));

    calcSubtotal();
}

const addOrderHistory = () => {
    if (activeOrder.length > 0) {
        orderNumber++;
        orderNumText.innerText = orderNumber;
        console.warn("Active order is:::", activeOrder);
        orderHistory.push(activeOrder);
        console.warn("Order history is:::", orderHistory);
        clearOrder();
    } else {
        alert("No items have been added yet.");
    }

}

const calcSubtotal = () => {
    let orderPricesArray = activeOrder.map(function(food) {
        return food.price;
    });

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
    totalBillBox.innerText = (Math.round(orderTotal * 100) / 100).toFixed(2);
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

            breakfastMenu = res.result.menus[0].menu_sections[0].menu_items;

            for (let i = 0; i < breakfastMenu.length; i++) {
                let newMenuOption = document.createElement("button");
                newMenuOption.setAttribute("type", "button");
                newMenuOption.setAttribute("name", `${breakfastMenu[i].name}`);
                newMenuOption.setAttribute("price", `${breakfastMenu[i].price}`);
                newMenuOption.setAttribute("class", "btn btn-success menu-item add-btn");
                newMenuOption.innerText = `${breakfastMenu[i].name}`;
                document.querySelector(".individual-options-area").append(newMenuOption)
            }

            let allAddBtns = document.querySelectorAll('.add-btn');
            allAddBtns.forEach(btn => btn.addEventListener("click", addNewMenuItem));

            // menuItemSelected = breakfastMenu.menu_items[i];
        })
        .catch(function(err) {
            console.log("Failed to retrieve data.", err);
        })
}

getData();



cancelOrderBtn.addEventListener("click", clearOrder);
closeModalBtn.addEventListener('click', closeModal);
openModalBtn.addEventListener('click', openModal);
discountBtn.addEventListener('click', calcDiscount);
sendOrderBtn.addEventListener("click", addOrderHistory);
