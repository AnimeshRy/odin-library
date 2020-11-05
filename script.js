function Book(title, author, pages, Read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.Read = Read
    this.info = function() {
        return `${this.title} ${this.author} ${this.pages} ${this.Read}`
    }
}

function addEntry(title, author, pages, Read) {
    item = new Book(title.value, author.value, pages.value, Read);
    console.log(item.info());
    myLibrary.push(item);
    console.log(myLibrary);
}

const form = document.querySelector('form')
form.onsubmit = function(e) {
    e.preventDefault()
    let Read;
    for (i=0; i< rStatus.length; i++) {
        if (rStatus[i].checked) {
            Read = rStatus[i].value;
        }
    }
    addEntry(title, author, pages, Read)
    form.reset()
    showitem()
    return false
}

function showitem() {
    document.querySelector('.unl').remove()
    ul = document.createElement('ul')
    ul.classList.add('unl')
    itemlist.append(ul);
    myLibrary.forEach(function (book) {
        item = document.createElement('li')
        item.innerHTML = `<div><span>Title : ${book.title}</span>
        <br>
        <span>Author : ${book.author}</span>
        <br>
        <span>Pages: ${book.pages}</span>
        <br>
        <span>Status: ${(book.Read === 'true') ? 'Read' : 'Pending'}</span></div><br>`
        document.querySelector('.unl').append(item);
    })
}

let myLibrary = [];
let title = document.querySelector("#title");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");
let rStatus = document.getElementsByName("rStatus");
let itemlist = document.querySelector('.itemlist')
