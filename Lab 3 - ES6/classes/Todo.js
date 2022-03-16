export default class Todo {
    constructor(title) {
      // HINT🤩
      // use a constructor to set basic property values
      this.title = title;
    }
  
    createElement() {
      let li = document.createElement("li");
      li.innerHTML = this.title;  
      if(li.innerHTML.includes("high:")) {
          li.classList.add("prior-high");
          this.title = this.title.replace("high:", "");
      }
      else if(li.innerHTML.includes("medium:")) {
        li.classList.add("prior-medium");
        this.title = this.title.replace("medium:", "");
      }
      else if(li.innerHTML.includes("low:")) {
        li.classList.add("prior-low");
        this.title = this.title.replace("low:", "");
      }
      else {
        li.classList.add("prior-medium");
      }
      li.innerHTML = this.title;
      li.addEventListener("click", this.markDone.bind(li));
      return li;
      // HINT🤩
      // this method will create the HTML structure with the correct classes, based on the todo priority
      // let newNote = document.createElement("li");
      // check if the todo item includes a priority like medium: to generate the correct classnames
      // don't forget to hook up an event listener for the click event
      // return newNote;
    }
  
    markDone(e) {
      this.classList.add("done");

      // if the item is clicked, but was already marked as done, remove the item from the list
      this.addEventListener("click", () => {
        if (this.className.includes("done")) {
          this.addEventListener("click", this.remove());
          let items = localStorage.getItem("items");
          items = JSON.parse(items);
  
          let text = this.innerHTML;
          let thisText = (item) => item === text;
          let index = items.findIndex(thisText);
          items.splice(index, 1);
          localStorage.setItem("items", JSON.stringify(items));
          
        }
      });
    



      // HINT🤩
      // this function should mark the current todo as done, by adding the correct CSS class
      // if the item is clicked, but was already marked as done, remove the item from the list
    }
  
    add() {
      // HINT🤩
      // this function should append the note to the screen somehow
      let todo = this.createElement(); // should return a full <li> with the right classes and innerHTML
        document.querySelector("#todo-list").appendChild(todo);
    }
  
    saveToStorage() {

    if (localStorage.getItem("items") === null) {
      //geen array, dus lege array vullen
      let item = [];
      let string = JSON.stringify(item);
      item.push(this.title);
      localStorage.setItem("items", string);
    } else {
      //array ophalen en uitsplitsen om daarna toe te voegen
      let item = JSON.parse(localStorage.getItem("items"));
      item.push(this.title);
      let string = JSON.stringify(item);
      localStorage.setItem("items", string);
    }
    console.log(localStorage);
      // HINT🤩
      // localStorage only supports strings, not arrays
      // if you want to store arrays, look at JSON.parse and JSON.stringify
    }
  }
  