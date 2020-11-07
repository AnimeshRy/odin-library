const tableBody = document.querySelector("tbody");
const addBookBtn = document.querySelector("#new-book");
const form = document.querySelector("form");
const formContainer = document.querySelector(".form-container");
const mainContainer = document.querySelector(".library-container");
let myLibrary = [];
let bookId = 0;

class Book {
  constructor(title, author, pages, hasRead) {
    this.title = title ? title : "--";
    this.author = author ? author : "--";
    this.pages = pages ? pages : "--";
    this.hasRead = hasRead ? hasRead : false;
    this.id = bookId++;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

// listen for click on form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  createNewBook();
});

// read library from local storage on document load
window.addEventListener("load", () => {
  if (localStorage.length !== 0) {
    JSON.parse(localStorage.getItem("library")).forEach((book) => {
      myLibrary.push(
        new Book(book.title, book.author, book.pages, book.hasRead)
      );
    });

    displayBooks();
  }
});
