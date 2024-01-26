# Bookshelf Web Application

The Bookshelf web application is a platform designed for managing a collection of books. Users can perform various actions such as adding new books, searching for specific titles, and organizing books based on whether they have been completed or are still in progress.

Features:

    Input New Book:
        Users can add a new book to their collection through a form.
        The form includes fields for the book's title, author, publication year, and a checkbox to mark whether the book has been completed.

    Search Books:
        A search functionality allows users to find books based on their titles.
        The search results are dynamically displayed, showing relevant information about the matched books.

    Bookshelf Organization:
        Books are categorized into two sections: "Belum selesai dibaca" (Not yet completed) and "Selesai dibaca" (Completed).
        Each section displays a list of books with details such as title, author, and publication year.

    Interactive Book Actions:
        Users can interact with their book collection by marking books as completed or not completed.
        Additionally, users can delete books from their collection.

    Local Storage:
        The application utilizes local storage to persistently store the user's book collection.
        Book data is stored in JSON format and retrieved from local storage to populate the bookshelf.

How it Works:

    When a user submits the "Masukkan Buku ke rak" (Add Book to Shelf) form, the book details are captured, and the book is categorized based on completion status.
    Search functionality dynamically filters and displays matching books.
    Users can interact with individual books by marking them as completed or deleting them.

Implementation:

    The application is built using HTML for the structure, CSS for styling, and JavaScript for dynamic functionality.
    Local storage is used to store and retrieve the user's book collection, ensuring persistence across sessions.

This Bookshelf web application provides an efficient and user-friendly way for book enthusiasts to manage and organize their reading materials.
