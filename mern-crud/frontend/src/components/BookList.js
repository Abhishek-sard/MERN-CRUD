import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = ({ setBooks, books, setEditingBook }) => {
  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  }, [setBooks]);

  const deleteBook = (id) => {
    axios.delete(`http://localhost:5000/api/books/${id}`)
      .then(() => setBooks(books.filter(book => book._id !== id)))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h3>Book List</h3>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            {book.title} by {book.author}
            <button onClick={() => setEditingBook(book)}>Edit</button>
            <button onClick={() => deleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
