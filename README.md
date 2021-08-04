# Roast Tab
A Point of Sale web application called Roast Tab (inspired by Toast Tab) used by restaurant staff to place food orders and maintain a running tab. To start an order, the user selects food items from the menu. The end result allows users to tabulate a total balance of the order so the restaurant guest is aware of how much to pay at the end of a visit.

## Background
I have a passion for fintech and food, which led me to learning more about Toast and its POS systems. I've always found POS systems quite interesting because it helps restaurant workers maintain order in an otherwise chaotic environment. POS systems typically also help track analytics to allow managers to better assess the efficiency and performance of the day-to-day operations.

By developing this project, I have a better understanding of the components that power POS systems and I can demonstrate my knowledge of HTML, CSS, JavaScript, and integrations to 3rd Party APIs.

[Deployed Website](https://andyjzhong.github.io/roast/)

## Installation
-   [DocuMenu](https://documenu.com/) API Key is required to run locally.

## Tech Stack
-   Built with HTML, CSS, and JavaScript
-   DocuMenu API
-   Bootstrap
-   FontAwesome
-   Google Fonts

## Features List
-   Log in and Log out functionality displays and hides the main content of the application.
-   Create new orders, cancel existing order, and option to save the order into the order history section.
-   Add items from the menu selection area to the tab and have the cost displayed to user.
-   Remove items from the tab area individually.
-   Ability to pull back order data and display it in the tab section.
-   Subtotals do math and discounts subtract from the subtotal.
-   Selecting the Pay button opens a new calculator modal for users to input amount tendered.
-   Validation for when payment amount doesn't surpass the balance due.
-   Confirming payment will disable order ticket from repeat payments.
-   Select from multiple tabs of menu sections.

## Future Enhancements
-   Allow editing of existing orders; currently existing orders have editing features disabled.
-   Allow users to Send and Pay at the same time; currently the user must send the order to the order history first.
-   Create user profiles based on username and login functionality.
-   Iterate over item quantities; currently if you want the same dish, it's listed twice.
-   Ability to customize menu options (i.e. add ketchup on the side).
-   Make a separate modal for discounts input; currently it's a prompt.
-   Add timestamps to each order.
-   Add analytics and metrics based on timestamps.
-   Make use of cogwheel settings button.
-   Add a dark mode.

## Journal

<details>
  <summary>Day 1</summary>

#### Set Up

-   Build initial files and connect HTML, CSS, and JS.
-   Add CSS libraries: Bootstrap and Font Awesome.

#### HTML & CSS

-   Add a navbar and a sample button with an event listener that logs text in the console when clicked.
-   Build initial HTML layout with 3 main sections: tab-area, menu-area, and total-area.
-   Create a table for menu items to be added to every time a menu item is selected.
-   Very minor styling, enough to help identify div sizes.

#### JavaScript

-   Expand on button event handler to append a new table row to the tab area with the name of the food item.
-   Loop through array of selected food items, grab the price, and reduce it to a total bill price.
-   Add a Cancel Order button and Send Order button.
-   Add a modal when Pay button is clicked to bring up the payment screen.
-   Add logic to calculate meals tax and to accept a user input value for discounts.

#### Other

-   Examine Postman output and create a sample data set so that I'm not making too many expensive API calls during initial build.
-   Create initial ReadMe file to keep track of progress each day.

      ![Initial Layout](https://i.imgur.com/eixEAK2.png)
      ![Initial Logic](https://media.giphy.com/media/xDddjFdHnXiMHm2eMD/giphy.gif)

    </details>

<details>
     <summary>Day 2</summary>

#### JavaScript
-   Debug calculation of discounts, taxes, and subtotal.
-   Work on logic for order history.
-   Added calculation of total bill based on refactored discounts, taxes, and subtotal.
-   Work on delete button functionality and renumbering of the tab items.
-   Refactor adding items so that the buttons get generated based on the API response dynamically and scales based on number of returned items.
-   Dynamically add event handlers to each of the aforementioned menu option buttons.

#### HTML & CSS
-   Style all sections.
-   Add tabs to menu section and style buttons.
-   Position buttons and minor responsive styling.

#### Other
-   Update sample data with more menu items.

![Day 2 Progress](https://i.imgur.com/ZD5Wol5.png)
![Day 2 Progress](https://media.giphy.com/media/vMLObyTvGXVsarJBYM/giphy.gif)


</details>

<details>
     <summary>Day 3</summary>

#### JavaScript
-   Add logic to create a new order history card on the click of Send.
-   Add logic to pull back order ticket information back to the tab area.
-   Disable editing of an existing order for MVP.
-   Payment functionality.
-   Reverse order of order history to show most recent orders first.

#### HTML & CSS
-   Install new font and color theme to match Toast styling.
-   Add a new order type indicator to differentiate between new orders and old orders.
-   Add a New Order button.
-   Minor responsive styling.
-   Add wiggle for when new ticket orders are added.

#### Other
-   Add a login modal.
-   Add logic for logging in and logging out.

![Day 3 Progress](https://i.imgur.com/tB0cAyV.png)
![Day 3 Progress](https://media.giphy.com/media/OJaEw0B5ChJilPI3ag/giphy.gif)


</details>

<details>
     <summary>Day 4</summary>

#### JavaScript
-   Spent most of the morning debugging the completePayment functionality.
-   Add more validation logic for when payment has been complete (hide/show/disable buttons).
-   Add logic to change balance due after payment complete.

#### HTML & CSS
-   Style log in modal and buttons.
-   Add friendly message when no orders are present.
-   Create calculator buttons and style modal.

#### Other
-   Add payment confirmation alert when payment is complete.

![Day 4 Progress](https://i.imgur.com/BoGrGfX.jpg)
![Day 4 Progress](https://i.imgur.com/nahMRgl.png)
![Day 4 Progress](https://media.giphy.com/media/HBPBcCDBTWpUCcYnK9/giphy.gif)


</details>

<details>
     <summary>Day 5</summary>

#### JavaScript
-   Add functionality to update calculator value when calculator buttons are clicked.
-   Add clear guest payment functionality.

#### HTML & CSS
-   Style calculator buttons.

![Day 5 Progress](https://i.imgur.com/tWpTSOJ.png)
![Day 5 Progress](https://media.giphy.com/media/msx9rsNgJQGxpw77gL/giphy.gif)


</details>

<details>
     <summary>Day 6</summary>

#### JavaScript
-   Stretch Goal: Allow multiple tabs of menu sections | Add event handlers for when menu tabs are clicked.
-   Stretch Goal: Additional validation for when payment is insufficient.

#### HTML & CSS
-   Style menu tabs and calculator buttons.
-   Responsive styling for mobile devices.

#### Other
-   Search for valid restaurant data in the DocuMenu API.
-   Pull back more than one menu section and display all menu items in selection area.
-   Set up secret key in local config.js file.
-   Add a shake response when payment is insufficient.

![Day 6 Progress](https://i.imgur.com/szfYhXI.png)
![Day 6 Progress](https://i.imgur.com/HbRjKYo.png)
![Day 6 Progress](https://media.giphy.com/media/ZaIftQgWY9jTnvHKYl/giphy.gif)


</details>

<details>
     <summary>Day 7</summary>

#### JavaScript
-   Stretch Goal: Add more menu sections and menu items.

#### HTML & CSS
-   Responsive styling for mobile devices.

#### Other
-   Add signature and link to portfolio from login page.

![Day 7 Progress](https://i.imgur.com/GqkcOvI.png)


</details>

## Challenges

-   Figuring out why certain values were not clearing on the cancel order button. I added some console.logs in the code to figure out the value of discounts before and after the click of the clear button and it turns out that the discount value itself was clearing, but it just wasn't updating in the DOM.
-   Determining how to create an order history seemed challenging but when I stepped away and actually wrote out the pseudocode for it, it made a lot more sense what I needed to achieve. I had to create a new function that takes the activeOrder array and push it into an orderHistory array.
-   Delete button was more complicated than I thought. I started with removing the selected item by traversing the DOM and using the splice() array method, deleting only the first item on the tab. The difficulty was renumbering the tab items displayed to the user. There seems to also be a race condition happening about 20% of the time where it would not number the items correctly and start with item 0.
-   Pulling back the data from order history was quite time consuming. It was a step by step process to grab the selected object and refill the tab's table with rows using the data from the selected object. Getting the completePayment function to work was also a challenge but it was much more simple once I broke it down step by step.
-   Many chain restaurants don't provide menu prices on the DocuMenu API.
-   Responsive styling is quite tedious and is definitely an art.

## Time Frames

| Task                    | Day 1      | Day 2      | Day 3       | Day 4      | Day 5      | Day 6      | Day 7      | Total       |
| ----------------------- | ---------- | ---------- | ----------- | ---------- | ---------- | ---------- | ---------- | ----------- |
| Set Up & HTML           | 2.0 hrs    | 0.5 hrs    | 0.5 hrs     | 0.5 hrs    | 0.5 hrs    | 0 hr       | 0 hr       | 4 hrs       |
| Connect to API & Render | 1 hrs      | 0.5 hrs    | 0 hrs       | 0 hr       | 0 hr       | 1.5 hrs    | 1 hr       | 4 hrs       |
| Add Application Logic   | 5.5 hrs    | 5.0 hrs    | 5.5 hrs     | 4.5 hrs    | 1 hrs      | 0.5 hrs    | 0 hr       | 22 hrs      |
| Styling                 | 0.5 hrs    | 3.0 hrs    | 3.0 hrs     | 2.0 hrs    | 1 hrs      | 0 hr       | 0 hr       | 9.5 hrs     |
| Responsive Styling      | 0 hrs      | 0 hrs      | 0.5 hrs     | 0 hr       | 0.5 hr     | 4.0 hrs    | 5.5 hrs    | 10.5 hrs    |
| **MVP Total**           | **9 hrs**  | **9 hrs**  | **9.5 hrs** | **7.0 hrs**| **3.0 hrs**| **6.0 hrs**| **6.5 hrs**| **50 hrs**  |
| Stretch Goals           | 0 hrs      | 0 hrs      | 1.5 hrs     | 0.5 hrs    | 0 hr       | 3.0 hrs    | 0.5 hrs    | 7.0 hrs     |
| **Project Total**       | **9.0 hrs**| **9.0 hrs**| **11.0 hrs**| **7.5 hrs**| **3.0 hrs**| **9.0 hrs**| **7.0 hrs**| **57 hrs**  |
