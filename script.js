'use-strict';

const balanceDue = document.querySelector("#balanceDue");
const balanceDueBox = document.querySelector("#balance-due-box");
const body = document.querySelector("body");
const cancelOrderBtn = document.querySelector(".cancel-order");
const closeModalBtn = document.querySelector('#cancel-payment');
const completePaymentBtn = document.querySelector("#complete-payment");
const discountBox = document.querySelector('#discount-box');
const discountBtn = document.querySelector('.add-discount');
const historyMsg = document.querySelector("#history-msg");
const loginBtn = document.querySelector("#login-btn");
const loginModal = document.querySelector('#login-modal');
const logoutBtn = document.querySelector("#logout-btn");
const mainContainer = document.querySelector('#main-container');
const mealsTaxBox = document.querySelector('#meals-tax-box');
const menuItemBtn = document.querySelector(".menu-item");
const modal = document.querySelector('#modal');
const orderHistoryArea = document.querySelector('.order-history-area');
const orderTicket = document.querySelector(".order-ticket");
const orderTypeText = document.querySelector('.order-type-value');
const payBtn = document.querySelector('#openModal');
const paymentSuccessMsg = document.querySelector("#payment-success");
const sendOrderBtn = document.querySelector(".send-order");
const startOrderBtn = document.querySelector(".start-order");
const subtotalBillBox = document.querySelector("#subtotal-bill-box");
const tabArea = document.querySelector(".tab-area");
const tableBody = document.querySelector(".table-body");
const tbody = document.querySelector("tbody")
const totalBillBox = document.querySelector("#total-bill-box");
let activeOrder = [];
let discount = 0;
let masterSelectedTicket = {};
let mealsTax = 0;
let orderHistory = [];
let orderNumber = 1;
let orderNumText = document.querySelector('.orderNumText');
let orderTotal = 0;
let subtotalBill = 0;

const addNewMenuItem = (e) => {
    let index = breakfastMenu.findIndex(item => item.name === e.target.name);
    activeOrder.push(breakfastMenu[index]);

    let newItem = document.createElement("tr");

    let itemHtml = `
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
      `;

    newItem.innerHTML = `${itemHtml}`;
    tbody.append(newItem);

    let allRemoveBtns = document.querySelectorAll('.remove-btn');
    allRemoveBtns.forEach(btn => btn.addEventListener("click", deleteItem));

    calcSubtotal();
}

const addOrderHistory = () => {
    if (activeOrder.length > 0) {
        orderNumber++;
        orderNumText.innerText = orderNumber;
        activeOrder.itemCount = activeOrder.length;
        activeOrder.ticketId = orderNumber - 1;
        activeOrder.payStatus = "Active";
        orderHistory.push(activeOrder);
        createOrderCard();
        clearOrder();
    } else {
        alert("No items have been added yet.");
    }
}

const checkPayment = () => {
    let targetButtonPayStatusValue = masterSelectedTicket.children.item(0).children.item(2).children.item(0).innerHTML;

    if (targetButtonPayStatusValue === "Paid") {
        payBtn.classList.add("disabled");
        payBtn.style.pointerEvents = "none";
        payBtn.innerText = "Paid";
        discountBtn.style.visibility = "hidden";
    } else {
        payBtn.classList.remove("disabled");
        payBtn.style.pointerEvents = "auto";
        payBtn.innerText = "Pay";
        discountBtn.style.visibility = "visible";
    }
}

const completePayment = () => {
    displayPaymentSuccess();

    setTimeout(function() {
        closeModal();
        enableOrdering();

        balanceDue.style.color = "#000";

        let targetButtonPayStatus = masterSelectedTicket.children.item(0).children.item(2).children.item(0);
        targetButtonPayStatus.innerText = "Paid";
        masterSelectedTicket.classList.add("disabled");

        let targetOrder = orderHistory[masterSelectedTicket.value];
        targetOrder.payStatus = "Paid";

        paymentSuccessMsg.style.visibility = "hidden";
    }, 1000);
}

const calcBill = () => {
    orderTotal = Number(subtotalBill) - Number(discount) + Number(mealsTax);
    totalBillBox.innerText = (Math.round(orderTotal * 100) / 100).toFixed(2);
    balanceDueBox.innerText = (Math.round(orderTotal * 100) / 100).toFixed(2);

    if (payBtn.innerText === "Paid") {
        balanceDue.style.color = "#28A745";
        balanceDueBox.innerText = "0.00";
    } else if (payBtn.innerText === "Pay" && totalBillBox.innerText == 0) {
        balanceDue.style.color = "#000";
    } else {
        balanceDue.style.color = "#DC3444";
    }
}

const calcDiscount = () => {
    discount = prompt("Enter a discount amount.")

    if (discount !== 0) {
        dicountBox.innerText = (Math.round(discount * 100) / 100).toFixed(2);
    }
    calcMealsTax();
}

const calcMealsTax = () => {
    mealsTax = (Math.round(((subtotalBill - discount) * 0.0625) * 100) / 100).toFixed(2);
    mealsTaxBox.innerText = mealsTax;
    calcBill();
}

const calcSubtotal = () => {
    let orderPricesArray = activeOrder.map(function(food) {
        return food.price;
    });

    subtotalBill = orderPricesArray.reduce(function(acc, price) {
        return acc += price;
    }, 0)

    subtotalBill = (Math.round(subtotalBill * 100) / 100).toFixed(2);
    subtotalBillBox.innerText = subtotalBill;
    calcMealsTax();
}

const clearOrder = () => {
    tableBody.innerHTML = "";
    activeOrder = [];
    discount = 0;
    discountBox.innerText = "0.00";
    mealsTax = 0;
    subtotalBill = 0;
    calcSubtotal();
}

const closeModal = () => {
    modal.style.display = 'none'
}

const createOrderCard = () => {
    historyMsg.style.display = "none";
    dynaIndex = orderNumber - 2;
    numOfItems = orderHistory[dynaIndex].itemCount;
    ticketId = orderHistory[dynaIndex].ticketId;
    payStatus = orderHistory[dynaIndex].payStatus;
    let newCard = document.createElement("button");
    newCard.setAttribute("class", "btn btn-dark order-ticket");
    newCard.setAttribute("value", dynaIndex);
    newCard.setAttribute("style", "height: 90%; width: 12rem; margin: 10px; background-color: #FFB740; color: #000;");

    let cardHtml = `
        <div class="order-ticket-content" style="pointer-events: none;">
            <h5 class="ticket-title">Order #${ticketId}</h5>
            <p>Item Count: ${numOfItems}</p>
            <p>Status: <span class="payStatusText">${payStatus}</span></p>
        </div>
      `;

    newCard.innerHTML = `${cardHtml}`;
    orderHistoryArea.parentNode.insertBefore(newCard, orderHistoryArea.nextSibling);

    makeWiggle();
    let allTickets = document.querySelectorAll('.order-ticket');
    allTickets.forEach(btn => btn.addEventListener("click", retrieveTicket));
}

const deleteItem = (e) => {
    removalCandidate = e.target.parentElement.parentElement.firstElementChild.innerHTML;
    rowIndex = removalCandidate - 1;
    activeOrder.splice(rowIndex, 1);
    tableBody.children.item(rowIndex).remove();
    renumberTable();
    calcSubtotal();
}

const disableOrdering = () => {
    cancelOrderBtn.classList.add("disabled");
    cancelOrderBtn.style.pointerEvents = "none";
    sendOrderBtn.classList.add("disabled");
    sendOrderBtn.style.pointerEvents = "none";

    let allAddBtns = document.querySelectorAll('.add-btn');
    allAddBtns.forEach(function(btn) {
        btn.classList.add("disabled");
        btn.style.pointerEvents = "none";
    });

    let allRemoveBtns = document.querySelectorAll('.remove-btn');
    allRemoveBtns.forEach(function(btn) {
        btn.classList.add("disabled");
        btn.style.pointerEvents = "none";
        btn.style.visibility = "hidden";
    });
}

const displayPaymentSuccess = () => { paymentSuccessMsg.style.visibility = "visible" };

const enableOrdering = () => {
    clearOrder();
    balanceDue.style.color = "#000";
    orderNumText.innerText = orderHistory.length + 1;
    orderTypeText.innerText = "New Order";

    cancelOrderBtn.classList.remove("disabled");
    cancelOrderBtn.style.pointerEvents = "auto";
    sendOrderBtn.classList.remove("disabled");
    sendOrderBtn.style.pointerEvents = "auto";

    payBtn.classList.remove("disabled");
    payBtn.style.pointerEvents = "auto";
    payBtn.innerText = "Pay";
    discountBtn.style.visibility = "visible";

    let allAddBtns = document.querySelectorAll('.add-btn');
    allAddBtns.forEach(function(btn) {
        btn.classList.remove("disabled");
        btn.style.pointerEvents = "auto";
    });

    let allRemoveBtns = document.querySelectorAll('.remove-btn');
    allRemoveBtns.forEach(function(btn) {
        btn.classList.remove("disabled");
        btn.style.pointerEvents = "auto";
        btn.style.visibility = "visible";
    });
}

const login = (e) => {
    e.preventDefault();
    loginModal.style.display = "none";
    mainContainer.style.opacity = 1;
    body.style.overflow = "scroll";
}

const logout = (e) => {
    e.preventDefault();
    loginModal.style.display = "block";
    mainContainer.style.opacity = 0;
    body.style.overflow = "hidden";
}

const makeWiggle = () => {
    document.querySelector(".order-ticket").classList.add("wiggle");
    setTimeout(() => { cancelOrderBtn.classList.remove("wiggle") }, 2000);
}

const openModal = () => { (activeOrder.length > 0) ? modal.style.display = 'block' : alert("No order selected.") };

const renumberTable = () => {
    // let rowTarget = tableBody.children.item(0).children.item(0);
    // console.log("rowTarget", rowTarget);

    if (activeOrder.length > 0) {
        let rowTargetText = tableBody.children.item(0).children.item(0).innerText;
        for (let i = 0; i < activeOrder.length; i++) {
            // console.error("rowTargetText", rowTargetText);
            let newRowNum = rowTargetText - 1;

            // console.warn("newRowNum", newRowNum);
            tableBody.children.item(i).children.item(0).innerText = newRowNum;
            rowTargetText++;
        }
    }
}

const retrieveTicket = (e) => {
    masterSelectedTicket = e.target;
    // TODO: If activeOrder.length > 0, Are you sure you want to cancel the current order?
    clearOrder();
    orderTypeText.innerText = "Existing Order";
    selectedTicketIndex = e.target.value;
    orderNumText.innerText = `${Number(selectedTicketIndex) + 1}`;
    selectedTicketOrder = orderHistory[selectedTicketIndex];

    for (let i = 0; i < selectedTicketOrder.length; i++) {

        let ticketItem = document.createElement("tr");

        let ticketItemHtml = `
            <td class="trow" scope="row">${i + 1}</th>
            <td>${selectedTicketOrder[i].name}</td>
            <td>1</td>
            <td>${(Math.round((selectedTicketOrder[i].price) * 100) / 100).toFixed(2)}</td>
            <td>${(Math.round((selectedTicketOrder[i].price) * 100) / 100).toFixed(2)}</td>
            <td>
                <button class="remove-btn btn btn-outline-danger btn-sm">
                    <i class="far fa-trash-alt"></i>
                </button>
            </td>
          `;

        ticketItem.innerHTML = `${ticketItemHtml}`;
        tbody.append(ticketItem);

        let allRemoveBtns = document.querySelectorAll('.remove-btn');
        allRemoveBtns.forEach(btn => btn.addEventListener("click", deleteItem));

        disableOrdering();
        checkPayment();
    }

    activeOrder = selectedTicketOrder;
    calcSubtotal();
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
                newMenuOption.setAttribute("class", "btn btn-dark menu-item add-btn");
                newMenuOption.setAttribute("style", "background-color: #3D83CE;");
                newMenuOption.innerText = `${breakfastMenu[i].name}`;
                document.querySelector(".individual-options-area").append(newMenuOption);
            }

            let allAddBtns = document.querySelectorAll('.add-btn');
            allAddBtns.forEach(btn => btn.addEventListener("click", addNewMenuItem));
        })
        .catch(function(err) {
            console.log("Failed to retrieve data.", err);
        })
}

getData();

const updateCalculator = (e) => {
    console.log(e.target.innerText);
}

let allCalcDigitBtns = document.querySelectorAll('.digit');
    allCalcDigitBtns.forEach(btn => btn.addEventListener("click", updateCalculator));

startOrderBtn.addEventListener("click", enableOrdering);
cancelOrderBtn.addEventListener("click", clearOrder);
closeModalBtn.addEventListener('click', closeModal);
payBtn.addEventListener('click', openModal);
discountBtn.addEventListener('click', calcDiscount);
sendOrderBtn.addEventListener("click", addOrderHistory);
completePaymentBtn.addEventListener("click", completePayment);
loginBtn.addEventListener("click", login);
logoutBtn.addEventListener("click", logout);
