# Vanilla JS Todo List

This is the classic Todo app exercise. 

Demo can be found here: [https://petter0619.github.io/vanilla-js-todo-list/](https://petter0619.github.io/vanilla-js-todo-list/)

### UI Description
* Initially, the list of todo cards will be empty.
* There is a form where the user can add a new 'todo'.
* When a new todo task is submitted from the form, a new todo card will be appended to the list.
* Clicking on a todo card will visually mark the card as done. Clicking it again will toggle the card back to its original appearance. 
* A remove-button is added to cards marked as 'done'. When the button is clicked, the card will be removed from the board.
* Cards marked as 'done' are moved to the bottom of the list.

### Technical description
* State is kept in a object and *NOT* in the DOM meaning the view should be dependent on the state, not the other way around.
* Code linted with Airbnb’s ESlint-configuration
* State is persisting in [localstorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). When the app is closed and then opened again, the state should be restored.
