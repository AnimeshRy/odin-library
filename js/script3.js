const tableBody = document.querySelector("tbody");
const addBookBtn = document.querySelector("#new-book");
const form = document.querySelector("form");
const formContainer = document.querySelector(".form-container");
const mainContainer = document.querySelector(".library-container");
let myLibrary = [];
let bookId = 0;

class Book {
    /** Book class to add initialize items */
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

function displayBooks() {
    myLibrary.forEach(displayBook);
}

function displayBook(book) {
    // associate id with row for later filtering
    const row = document.createElement("tr");
    row.id = book.id;

    // create table cell for each book property except id
    for (const prop in book) {
        if (prop === "id") continue;
        row.appendChild(createCell(book[prop]));
    }

    // create table cell containing clickable remove button
    const remove = document.createElement("button");
    remove.classList.add("remove");
    row.appendChild(createCell(remove));
    remove.addEventListener("click", removeBook);

    tableBody.appendChild(row);
}

// create table cell containing given input
function createCell(input) {
    const cell = document.createElement("td");

    if (typeof input === "string") cell.innerHTML = input;
    // apply tick and cross overlay css to boolean values
    else if (typeof input === "boolean")
        cell.appendChild(createStatusInput(input));
    // input is the button remove object
    else {
        cell.appendChild(input);
        cell.classList.add("remove-cell");
    }
    return cell;
}

function createStatusInput(input) {
    const span = document.createElement("span");
    span.classList.add(input ? "read-cross" : "read-tick");
    span.addEventListener("click", toggleReadStatus);
    span.innerHTML = input ? "read" : "unread";
    return span;
}

// toggle visibility of the new book form
function toggleForm() {
    formContainer.classList.toggle("invisible");
    mainContainer.classList.toggle("invisible");
}

function removeBook() {
    // remove book matching the row id = bookId for that row
    const rowId = getRowIdByChildNode(this);
    myLibrary = myLibrary.filter((book) => book.id != rowId);
    updateLocalStorage(myLibrary);
    // remove all rows
    tableBody.innerHTML = "";
    // re-draw all rows
    displayBooks();
}

// initialise new book based on form input and add to library
function createNewBook() {
    const book = new Book(
        document.querySelector("#name").value,
        document.querySelector("#author").value,
        document.querySelector("#pages").value,
        document.querySelector("#read").value == "true" ? true : false
    );
    addBookToLibrary(book);
    updateLocalStorage(myLibrary);
    displayBook(book);
    toggleForm();
}

function toggleReadStatus() {
    // toggle corresponding book element status
    // console.log(this);
    const book = getBookByID(getRowIdByChildNode(this));
    book.hasRead = !book.hasRead;
    updateLocalStorage(myLibrary);

    // update status text and toggle hover image
    this.innerHTML = book.hasRead ? "read" : "unread";
    this.classList.toggle("read-cross");
    this.classList.toggle("read-tick");
}

function getBookByID(id) {
    return myLibrary.filter((book) => book.id == id)[0];
}

function getRowIdByChildNode(node) {
    while (node.nodeName != "TR") {
        node = node.parentNode
    };
    return node.id;
}

function updateLocalStorage(myLibrary) {
    localStorage.setItem("library", JSON.stringify(myLibrary));
}

// listen for click on the new book button
addBookBtn.addEventListener("click", toggleForm);

// listen for click on form submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    createNewBook();
    location.reload();
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