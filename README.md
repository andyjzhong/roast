# Roast Tab

## Journal

### Day 1

<details>
  <summary>Click to expand!</summary>

#### Set Up

-   Build initial files and connect HTML, CSS, and JS.
-   Add CSS libraries: Bootstrap and Font Awesome.

    #### HTML & CSS

-   Add a navbar and a sample button with an event listener that logs text in the console when clicked.
-   Build initial HTML layout with 3 main sections: tab-area, menu-area, and total-section.
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
     <summary>Click to expand!</summary>

    #### JavaScript
    - Debug calculation of Discounts, Taxes, and Subtotal.

</details>

## Challenges

-   Figuring out why certain values were not clearing on the cancel order button. I added some console.logs in the code to figure out the value of discounts before and after the click of the clear button and it turns out that the discount value itself was clearing, but it just wasn't updating in the DOM.

## Time Frames

| Task                       | Day 1       | Day 2       | Day 3     |
| -------------------------- | ----------- | ----------- | --------- |
| Set Up Framework & HTML    | 2.0 hr      | 0 hr        | 0 hr      |
| Connecting to API & Render | 1 hr        | 0 hr        | 0 hr      |
| Add Application Logic      | 5.5 hrs     | 0.5 hr      | 0 hr      |
| Styling                    | 0.5 hrs     | 0 hr        | 0 hr      |
| Responsive Styling         | 0 hrs       | 0 hr        | 0 hr      |
| **MVP Total**              | **9 hrs**   | **0 hrs**   | **0 hrs** |
| Stretch Goals              | 0 hrs       | 0 hrs       | 0 hr      |
| **Project Total**          | **9.0 hrs** | **0.0 hrs** | **0 hrs** |
