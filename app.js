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
        const StoredBooks = [
            {
                title: 'Book One',
                author: 'John Doe',
                isbn: '1234568'
            },
            {
                title: 'Book Two',
                author: 'John Doe',
                isbn: '1234568'
            }
        ];

        const books = StoredBooks;

        books.forEach(book => UI.addBookToList(book));

    }
    
    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><button class="btn btn-danger btn-sm delete">X</button></td>
        `;

        list.appendChild(row);

    }
}

// Store Class: Handles Storage (localStorage)

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event: Add a Book

// Event: Remove a Book