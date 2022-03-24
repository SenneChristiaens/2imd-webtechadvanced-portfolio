import Todo from './Todo.js';


export default class App {
    constructor() {
      this.setupEventListeners(); 
      this.loadFromStorage();
    }
  
    setupEventListeners() {
      document.querySelector("#add-item-text").addEventListener("keyup", this.createItem.bind(this));
    }
  
    createItem(e) {
        if (e.key === 'Enter' && document.querySelector("#add-item-text").value != ""){
            let todo = new Todo(document.querySelector("#add-item-text").value);
            todo.add();
            todo.saveToStorage();
            this.reset();
        }
    }
  
    loadFromStorage() {
        let notes = [],
            keys = Object.keys(localStorage),
            i = keys.length;
    
        while ( i-- ) {
            notes.push( JSON.parse(localStorage.getItem(keys[i])));
        }
      for (let note of notes) {
        let todo = new Todo(note.title, note.done);
        todo.add();
      }
    }
  
    reset() {
        document.querySelector("#add-item-text").value = "";
    }
  }