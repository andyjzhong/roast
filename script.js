'use-strict';

// const API_KEY = config.API_KEY;
const RESTAURANT_ID = "4235058471070138";
const amountDueValue = document.querySelector("#amountDue");
const balanceDue = document.querySelector("#balanceDue");
const balanceDueBox = document.querySelector("#balance-due-box");
const body = document.querySelector("body");
const cancelOrderBtn = document.querySelector(".cancel-order");
const clearGuestPaymentBtn = document.querySelector('.clear-calc');
const closeModalBtn = document.querySelector('#cancel-payment');
const completePaymentBtn = document.querySelector("#complete-payment");
const discountBox = document.querySelector('#discount-box');
const discountBtn = document.querySelector('.add-discount');
const guestPaymentBox = document.querySelector("#guestPayment");
const historyMsg = document.querySelector("#history-msg");
const loginBtn = document.querySelector("#login-btn");
const loginModal = document.querySelector('#login-modal');
const logoutBtn = document.querySelector("#logout-btn");
const mainContainer = document.querySelector('#main-container');
const mealsTaxBox = document.querySelector('#meals-tax-box');
const menuItemBtn = document.querySelector(".menu-item");
const menuTabMain = document.querySelector("#menu-tab-main");
const menuTabSides = document.querySelector("#menu-tab-sides");
const modal = document.querySelector('#modal');
const orderHistoryArea = document.querySelector('.order-history-area');
const orderTicket = document.querySelector(".order-ticket");
const orderTypeText = document.querySelector('.order-type-value');
const payBtn = document.querySelector('#openModal');
const paymentModal = document.querySelector("#modal-textbox");
const paymentFailureMsg = document.querySelector("#payment-failure");
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
let fullMenu = [];
let masterSelectedTicket = {};
let mealsTax = 0;
let orderHistory = [];
let orderNumber = 1;
let orderNumText = document.querySelector('.orderNumText');
let orderTotal = 0;
let subtotalBill = 0;

const changeTabsToSides = (e) => {
    e.preventDefault();
    let allMenuTabs = document.querySelectorAll('.menu-tab');
    allMenuTabs.forEach(btn => btn.classList.remove("active"));

    let allMainMenu = document.querySelectorAll('.menu-main');
    allMainMenu.forEach(btn => btn.style.display = "none");

    let allSidesMenu = document.querySelectorAll('.menu-sides');
    allSidesMenu.forEach(btn => btn.style.display = "");

    e.target.classList.add("active");
}

const changeTabsToMain = (e) => {
    e.preventDefault();
    let allMenuTabs = document.querySelectorAll('.menu-tab');
    allMenuTabs.forEach(btn => btn.classList.remove("active"));

    let allMainMenu = document.querySelectorAll('.menu-main');
    allMainMenu.forEach(btn => btn.style.display = "");

    let allSidesMenu = document.querySelectorAll('.menu-sides');
    allSidesMenu.forEach(btn => btn.style.display = "none");

    e.target.classList.add("active");
}

const clearGuestPayment = () => {
    guestPaymentBox.value = "";
}

const addNewMenuItem = (e) => {
    let index = fullMenu.findIndex(item => item.name === e.target.name);
    activeOrder.push(fullMenu[index]);

    let newItem = document.createElement("tr");

    let itemHtml = `
        <td class="trow" scope="row" style="text-align: center;">${activeOrder.length}</th>
        <td>${e.target.name}</td>
        <td style="text-align: center;">1</td>
        <td style="text-align: right;">$${(Math.round(e.target.getAttribute("price") * 100) / 100).toFixed(2)}</td>
        <td style="text-align: right;">$${(Math.round(e.target.getAttribute("price") * 100) / 100).toFixed(2)}</td>
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
    if (Number(guestPaymentBox.value) >= Number(balanceDueBox.innerText)) {
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
            clearGuestPayment();
        }, 1000);
    } else {
        displayPaymentFailure();
    }
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
        discountBox.innerText = (Math.round(discount * 100) / 100).toFixed(2);
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
    modal.style.display = 'none';
    clearGuestPayment();
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
    newCard.setAttribute("style", "height: 84%; width: 12rem; margin: 10px; background-color: #FF7043; color: #000;");

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

const displayPaymentSuccess = () => {
    paymentSuccessMsg.style.visibility = "visible";
    paymentSuccessMsg.style.display = "";
    paymentFailureMsg.style.display = "none";
};

const displayPaymentFailure = () => {
    paymentModal.classList.add("shake");
    paymentFailureMsg.style.visibility = "visible";
    paymentFailureMsg.style.display = "";
    paymentSuccessMsg.style.display = "none";
    setTimeout(function() {
        paymentModal.classList.remove("shake");
    }, 1000)
};

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

    if (fullMenu.length === 0) {
        getData();
    }

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

const openModal = () => {
    if (activeOrder.length > 0 && (orderNumText.innerText == orderHistory.length)) {
        modal.style.display = 'block';
        amountDueValue.innerText = balanceDueBox.innerText;
    } else if (activeOrder.length > 0) {
        alert("Please send an order to the kitchen first.");
    } else {
        alert("Please select an existing order to make a payment.");
    }
}

const renumberTable = () => {
    if (activeOrder.length > 0) {
        let rowTargetText = 2;
        for (let i = 0; i < activeOrder.length; i++) {
            let newRowNum = rowTargetText - 1;

            tableBody.children.item(i).children.item(0).innerText = newRowNum;
            rowTargetText++;
        }
    }
}

const retrieveTicket = (e) => {
    console.log("e", e.target);
    masterSelectedTicket = e.target;
    clearOrder();
    orderTypeText.innerText = "Existing Order";
    selectedTicketIndex = e.target.value;
    console.log(selectedTicketIndex);
    orderNumText.innerText = `${Number(selectedTicketIndex) + 1}`;
    selectedTicketOrder = orderHistory[selectedTicketIndex];
    console.log(selectedTicketOrder);

    for (let i = 0; i < selectedTicketOrder.length; i++) {

        let ticketItem = document.createElement("tr");

        let ticketItemHtml = `
            <td class="trow" scope="row" style="text-align: center;">${i + 1}</th>
            <td>${selectedTicketOrder[i].name}</td>
            <td style="text-align: center;">1</td>
            <td style="text-align: right;">${(Math.round((selectedTicketOrder[i].price) * 100) / 100).toFixed(2)}</td>
            <td style="text-align: right;">${(Math.round((selectedTicketOrder[i].price) * 100) / 100).toFixed(2)}</td>
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
    // let liveUrl = `https://api.documenu.com/v2/restaurant/${RESTAURANT_ID}?key=${API_KEY}`;
    let mode = "demo";
    console.warn(`Initiating ${mode} mode.`);
    let url = (mode == "live") ? liveUrl : `./sampleData.json`;

    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then(function(res) {
            console.log("Retrieved data successfully.", res);

            mainMenu = res.result.menus[0].menu_sections[6].menu_items;
            steakMenu = res.result.menus[0].menu_sections[7].menu_items;
            sidesMenu = res.result.menus[0].menu_sections[11].menu_items;

            mainMenu.map(function(food) {
                fullMenu.push(food);
            });

            steakMenu.map(function(food) {
                fullMenu.push(food);
            });

            sidesMenu.map(function(food) {
                fullMenu.push(food);
            });

            // Main Menu
            for (let i = 0; i < mainMenu.length; i++) {
                let newMenuOption = document.createElement("button");
                newMenuOption.setAttribute("type", "button");
                newMenuOption.setAttribute("name", `${mainMenu[i].name}`);
                newMenuOption.setAttribute("price", `${mainMenu[i].price}`);
                newMenuOption.setAttribute("class", "menu-main btn btn-dark menu-item add-btn");
                newMenuOption.setAttribute("style", "background-color: #3D83CE;");
                newMenuOption.innerText = `${mainMenu[i].name}`;
                document.querySelector(".individual-options-area").append(newMenuOption);
            }

            // Steak Menu
            for (let i = 0; i < steakMenu.length; i++) {
                let newMenuOption = document.createElement("button");
                newMenuOption.setAttribute("type", "button");
                newMenuOption.setAttribute("name", `${steakMenu[i].name}`);
                newMenuOption.setAttribute("price", `${steakMenu[i].price}`);
                newMenuOption.setAttribute("class", "menu-main menu-steak btn btn-dark menu-item add-btn");
                newMenuOption.setAttribute("style", "background-color: #3D83CE;");
                newMenuOption.innerText = `${steakMenu[i].name}`;
                document.querySelector(".individual-options-area").append(newMenuOption);
            }

            // Sides Menu
            for (let i = 0; i < sidesMenu.length; i++) {
                let newMenuOption = document.createElement("button");
                newMenuOption.setAttribute("type", "button");
                newMenuOption.setAttribute("name", `${sidesMenu[i].name}`);
                newMenuOption.setAttribute("price", `${sidesMenu[i].price}`);
                newMenuOption.setAttribute("class", "menu-sides btn btn-dark menu-item add-btn");
                newMenuOption.setAttribute("style", "background-color: #3D83CE; display: none;");
                newMenuOption.innerText = `${sidesMenu[i].name}`;
                document.querySelector(".individual-options-area").append(newMenuOption);
            }

            let allAddBtns = document.querySelectorAll('.add-btn');
            allAddBtns.forEach(btn => btn.addEventListener("click", addNewMenuItem));
        })
        .catch(function(err) {
            console.log("Failed to retrieve data.", err);
        })
}

const updateCalculator = (e) => {
    guestPaymentBox.value = guestPaymentBox.value.toString() + e.target.innerText.toString();
}

let allCalcDigitBtns = document.querySelectorAll('.digit');
    allCalcDigitBtns.forEach(btn => btn.addEventListener("click", updateCalculator));

startOrderBtn.addEventListener("click", enableOrdering);
cancelOrderBtn.addEventListener("click", clearOrder);
clearGuestPaymentBtn.addEventListener("click", clearGuestPayment);
closeModalBtn.addEventListener('click', closeModal);
payBtn.addEventListener('click', openModal);
discountBtn.addEventListener('click', calcDiscount);
sendOrderBtn.addEventListener("click", addOrderHistory);
completePaymentBtn.addEventListener("click", completePayment);
loginBtn.addEventListener("click", login);
logoutBtn.addEventListener("click", logout);
menuTabSides.addEventListener("click", changeTabsToSides);
menuTabMain.addEventListener("click", changeTabsToMain);
