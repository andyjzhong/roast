# Roast Tab

## Tech Stack
-   Built with HTML, CSS, and JavaScript
-   DocuMenu API
-   Bootstrap
-   FontAwesome

## Journal

### Day 1

<details>
  <summary>Expand</summary>

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

### Day 2

<details>
     <summary>Expand</summary>

#### JavaScript
-   Debug calculation of discounts, taxes, and subtotal.
-   Work on logic for order history.
-   Added calculation of total bill based on refactored discounts, taxes, and subtotal.
-   Work on delete button functionality and renumbering of the tab items.
-   Refactor adding items so that the buttons get generated based on the API response dynamically and scales based on number of returned items.
-   Dynamically add event handlers to each of the aforementioned menu option buttons.

#### CSS
-   Style Totals section

</details>

## Challenges

-   Figuring out why certain values were not clearing on the cancel order button. I added some console.logs in the code to figure out the value of discounts before and after the click of the clear button and it turns out that the discount value itself was clearing, but it just wasn't updating in the DOM.
-   Determining how to create an order history seemed challenging but when I stepped away and actually wrote out the pseudocode for it, it made a lot more sense what I needed to achieve. I had to create a new function that takes the activeOrder array and push it into an orderHistory array.
-   Delete button was more complicated than I thought. I started with removing the selected item by traversing the DOM and using the splice() array method, deleting only the first item on the tab. The more difficult part was renumbering the tab items displayed to the user.

## Time Frames

| Task                       | Day 1       | Day 2       | Day 3     |
| -------------------------- | ----------- | ----------- | --------- |
| Set Up Framework & HTML    | 2.0 hr      | 0 hr        | 0 hr      |
| Connecting to API & Render | 1 hr        | 0.5 hr        | 0 hr    |
| Add Application Logic      | 5.5 hrs     | 5.0 hrs     | 0 hr      |
| Styling                    | 0.5 hrs     | 0.5 hr      | 0 hr      |
| Responsive Styling         | 0 hrs       | 0 hr        | 0 hr      |
| **MVP Total**              | **9 hrs**   | **6.0 hrs** | **0 hrs** |
| Stretch Goals              | 0 hrs       | 0 hrs       | 0 hr      |
| **Project Total**          | **9.0 hrs** | **0.0 hrs** | **0 hrs** |
