// Book Class: Reps a book

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI Tasks

class UI {
    static displayBooks() {
        

        const books = Store.getBooks();

        books.forEach(book => UI.addBookToList(book));

    }
    
    static addBookToList(book) {
        const list = document.querySelector('#js-book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><button class="btn btn-danger btn-sm js-delete">X</button></td>
        `;

        list.appendChild(row);

    }

    static deleteBook(el) {
        if(el.classList.contains('js-delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');

        div.className =`js-alert alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.js-container');
        const form = document.querySelector('#js-book-form');

        container.insertBefore(div, form);

        // Remove in 3 seconds
        setTimeout(() => {
            document.querySelector('.js-alert').remove();
        }, 3000);

    }

}

// Store Class: Handles Storage (localStorage)

class Store {
    static getBooks() {
        let books;

        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        let books = Store.getBooks();

        books = books.filter(book => book.isbn !== isbn);

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event: Add a Book
document.querySelector('#js-book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate values
    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all the fields', 'danger');
    } else {
        // Instantiate book
        const book = new Book(title, author, isbn);

        // Add book to list
        UI.addBookToList(book);

        // Add book to store
        Store.addBook(book);

        // Show success message
        UI.showAlert('Book added successfully', 'success');

        // Clear Fields
        e.target.reset();        
    }
});

// Event: Remove a Book

document.querySelector('#js-book-list').addEventListener('click', e => {
    UI.deleteBook(e.target);

    // Delete from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    // Show success message
    UI.showAlert('Book removed successfully', 'success');
})