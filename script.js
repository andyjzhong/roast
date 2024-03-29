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
const menuTabApps = document.querySelector("#menu-tab-apps");
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
let allCalcDigitBtns = document.querySelectorAll('.digit');
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

const changeTabsToApps = (e) => {
    e.preventDefault();
    let allMenuTabs = document.querySelectorAll('.menu-tab');
    allMenuTabs.forEach(btn => btn.classList.remove("active"));

    let allMainMenu = document.querySelectorAll('.menu-main');
    allMainMenu.forEach(btn => btn.style.display = "none");

    let allSidesMenu = document.querySelectorAll('.menu-sides');
    allSidesMenu.forEach(btn => btn.style.display = "none");

    let allAppsMenu = document.querySelectorAll('.menu-apps');
    allAppsMenu.forEach(btn => btn.style.display = "");

    e.target.classList.add("active");
}

const changeTabsToSides = (e) => {
    e.preventDefault();
    let allMenuTabs = document.querySelectorAll('.menu-tab');
    allMenuTabs.forEach(btn => btn.classList.remove("active"));

    let allMainMenu = document.querySelectorAll('.menu-main');
    allMainMenu.forEach(btn => btn.style.display = "none");

    let allAppsMenu = document.querySelectorAll('.menu-apps');
    allAppsMenu.forEach(btn => btn.style.display = "none");

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

    let allAppsMenu = document.querySelectorAll('.menu-apps');
    allAppsMenu.forEach(btn => btn.style.display = "none");

    let allSidesMenu = document.querySelectorAll('.menu-sides');
    allSidesMenu.forEach(btn => btn.style.display = "none");

    e.target.classList.add("active");
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

const clearOrder = () => {
    tableBody.innerHTML = "";
    activeOrder = [];
    discount = 0;
    discountBox.innerText = "0.00";
    mealsTax = 0;
    subtotalBill = 0;
    calcSubtotal();
}

const clearGuestPayment = () => { guestPaymentBox.value = "" };

const closeModal = () => {
    modal.style.display = 'none';
    clearGuestPayment();
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

const createOrderCard = () => {
    historyMsg.style.display = "none";
    dynaIndex = orderNumber - 2;
    numOfItems = orderHistory[dynaIndex].itemCount;
    ticketId = orderHistory[dynaIndex].ticketId;
    payStatus = orderHistory[dynaIndex].payStatus;

    let newCard = document.createElement("button");
    newCard.setAttribute("class", "btn btn-dark order-ticket");
    newCard.setAttribute("value", dynaIndex);
    newCard.setAttribute("style", "height: 84%; width: 12rem; margin: 10px; background-color: #FFB740; color: #000;");

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
    window.scrollTo(0, 0);

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
    if (orderNumText.innerText > orderHistory.length) {
        alert("Please send an order to the kitchen first.");
    } else if (activeOrder.length > 0) {
        modal.style.display = 'block';
        amountDueValue.innerText = balanceDueBox.innerText;
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
    masterSelectedTicket = e.target;
    clearOrder();
    orderTypeText.innerText = "Existing Order";
    selectedTicketIndex = e.target.value;
    orderNumText.innerText = `${Number(selectedTicketIndex) + 1}`;
    selectedTicketOrder = orderHistory[selectedTicketIndex];

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
            console.warn("Retrieved data successfully.", res);

            menuSection = res.result.menus[0].menu_sections;

            antiPastiMenu = menuSection[0].menu_items;
            eggrollsMenu = menuSection[1].menu_items;
            saladMenu = menuSection[2].menu_items;
            starchesMenu = menuSection[3].menu_items;
            appsMenu = menuSection[4].menu_items;
            classicsMenu = menuSection[5].menu_items;
            mainMenu = menuSection[6].menu_items;
            steakMenu = menuSection[7].menu_items;
            seafoodMenu = menuSection[8].menu_items;
            sidesMenu = menuSection[11].menu_items;

            antiPastiMenu.map(food => fullMenu.push(food));
            eggrollsMenu.map(food => fullMenu.push(food));
            appsMenu.map(food => fullMenu.push(food));
            mainMenu.map(food => fullMenu.push(food));
            steakMenu.map(food => fullMenu.push(food));
            sidesMenu.map(food => fullMenu.push(food));
            classicsMenu.map(food => fullMenu.push(food));
            saladMenu.map(food => fullMenu.push(food));
            starchesMenu.map(food => fullMenu.push(food));
            seafoodMenu.map(food => fullMenu.push(food));

            // Salad Menu
            for (let i = 0; i < saladMenu.length; i++) {
                let newMenuOption = document.createElement("button");
                newMenuOption.setAttribute("type", "button");
                newMenuOption.setAttribute("name", `${saladMenu[i].name}`);
                newMenuOption.setAttribute("price", `${saladMenu[i].price}`);
                newMenuOption.setAttribute("class", "menu-main btn btn-dark menu-item add-btn");
                newMenuOption.setAttribute("style", "background-color: #3D83CE;");
                newMenuOption.innerText = `${saladMenu[i].name}`;
                document.querySelector(".individual-options-area").append(newMenuOption);
            }

            // Classics Menu
            for (let i = 0; i < classicsMenu.length; i++) {
                let newMenuOption = document.createElement("button");
                newMenuOption.setAttribute("type", "button");
                newMenuOption.setAttribute("name", `${classicsMenu[i].name}`);
                newMenuOption.setAttribute("price", `${classicsMenu[i].price}`);
                newMenuOption.setAttribute("class", "menu-main btn btn-dark menu-item add-btn");
                newMenuOption.setAttribute("style", "background-color: #3D83CE;");
                newMenuOption.innerText = `${classicsMenu[i].name}`;
                document.querySelector(".individual-options-area").append(newMenuOption);
            }

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

            // Starch Menu
            for (let i = 0; i < starchesMenu.length; i++) {
                let newMenuOption = document.createElement("button");
                newMenuOption.setAttribute("type", "button");
                newMenuOption.setAttribute("name", `${starchesMenu[i].name}`);
                newMenuOption.setAttribute("price", `${starchesMenu[i].price}`);
                newMenuOption.setAttribute("class", "menu-main menu-steak btn btn-dark menu-item add-btn");
                newMenuOption.setAttribute("style", "background-color: #3D83CE;");
                newMenuOption.innerText = `${starchesMenu[i].name}`;
                document.querySelector(".individual-options-area").append(newMenuOption);
            }

            // Seafood Menu
            for (let i = 0; i < seafoodMenu.length; i++) {
                let newMenuOption = document.createElement("button");
                newMenuOption.setAttribute("type", "button");
                newMenuOption.setAttribute("name", `${seafoodMenu[i].name}`);
                newMenuOption.setAttribute("price", `${seafoodMenu[i].price}`);
                newMenuOption.setAttribute("class", "menu-main menu-steak btn btn-dark menu-item add-btn");
                newMenuOption.setAttribute("style", "background-color: #3D83CE;");
                newMenuOption.innerText = `${seafoodMenu[i].name}`;
                document.querySelector(".individual-options-area").append(newMenuOption);
            }

            // Sides Menu
            for (let i = 0; i < sidesMenu.length; i++) {
                let newMenuOption = document.createElement("button");
                newMenuOption.setAttribute("type", "button");
                newMenuOption.setAttribute("name", `${sidesMenu[i].name}`);
                newMenuOption.setAttribute("price", `${sidesMenu[i].price}`);
                newMenuOption.setAttribute("class", "menu-sides btn btn-dark menu-item add-btn");
                newMenuOption.setAttribute("style", "background-color: #F46233; display: none;");
                newMenuOption.innerText = `${sidesMenu[i].name}`;
                document.querySelector(".individual-options-area").append(newMenuOption);
            }

            // Apps Menu
            for (let i = 0; i < appsMenu.length; i++) {
                let newMenuOption = document.createElement("button");
                newMenuOption.setAttribute("type", "button");
                newMenuOption.setAttribute("name", `${appsMenu[i].name}`);
                newMenuOption.setAttribute("price", `${appsMenu[i].price}`);
                newMenuOption.setAttribute("class", "menu-apps btn btn-dark menu-item add-btn");
                newMenuOption.setAttribute("style", "background-color: #2E7C86; display: none;");
                newMenuOption.innerText = `${appsMenu[i].name}`;
                document.querySelector(".individual-options-area").append(newMenuOption);
            }

            // Eggrolls Menu
            for (let i = 0; i < eggrollsMenu.length; i++) {
                let newMenuOption = document.createElement("button");
                newMenuOption.setAttribute("type", "button");
                newMenuOption.setAttribute("name", `${eggrollsMenu[i].name}`);
                newMenuOption.setAttribute("price", `${eggrollsMenu[i].price}`);
                newMenuOption.setAttribute("class", "menu-apps btn btn-dark menu-item add-btn");
                newMenuOption.setAttribute("style", "background-color: #2E7C86; display: none;");
                newMenuOption.innerText = `${eggrollsMenu[i].name}`;
                document.querySelector(".individual-options-area").append(newMenuOption);
            }

            // Antipasti Menu
            for (let i = 0; i < antiPastiMenu.length; i++) {
                let newMenuOption = document.createElement("button");
                newMenuOption.setAttribute("type", "button");
                newMenuOption.setAttribute("name", `${antiPastiMenu[i].name}`);
                newMenuOption.setAttribute("price", `${antiPastiMenu[i].price}`);
                newMenuOption.setAttribute("class", "menu-apps btn btn-dark menu-item add-btn");
                newMenuOption.setAttribute("style", "background-color: #2E7C86; display: none;");
                newMenuOption.innerText = `${antiPastiMenu[i].name}`;
                document.querySelector(".individual-options-area").append(newMenuOption);
            }

            let allAddBtns = document.querySelectorAll('.add-btn');
            allAddBtns.forEach(btn => btn.addEventListener("click", addNewMenuItem));
        })
        .catch(function(err) {
            console.error("Failed to retrieve data.", err);
        })
}

const updateCalculator = (e) => {
    guestPaymentBox.value = parseFloat(guestPaymentBox.value.toString() + e.target.innerText.toString());
}

allCalcDigitBtns.forEach(btn => btn.addEventListener("click", updateCalculator));
cancelOrderBtn.addEventListener("click", clearOrder);
clearGuestPaymentBtn.addEventListener("click", clearGuestPayment);
closeModalBtn.addEventListener('click', closeModal);
completePaymentBtn.addEventListener("click", completePayment);
discountBtn.addEventListener('click', calcDiscount);
loginBtn.addEventListener("click", login);
logoutBtn.addEventListener("click", logout);
menuTabSides.addEventListener("click", changeTabsToSides);
menuTabMain.addEventListener("click", changeTabsToMain);
menuTabApps.addEventListener("click", changeTabsToApps);
payBtn.addEventListener('click', openModal);
sendOrderBtn.addEventListener("click", addOrderHistory);
startOrderBtn.addEventListener("click", enableOrdering);
