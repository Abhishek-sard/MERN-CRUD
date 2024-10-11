import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookForm = ({ books, setBooks, editingBook, setEditingBook }) => {
  const [bookData, setBookData] = useState({ title: '', author: '', publishedYear: '' });

  useEffect(() => {
    if (editingBook) {
      setBookData(editingBook);
    }
  }, [editingBook]);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingBook) {
      axios.put(`http://localhost:5000/api/books/${editingBook._id}`, bookData)
        .then(res => {
          setBooks(books.map(book => (book._id === editingBook._id ? res.data : book)));
          setEditingBook(null);
        });
    } else {
      axios.post('http://localhost:5000/api/books', bookData)
        .then(res => {
          setBooks([...books, res.data]);
        });
    }

    setBookData({ title: '', author: '', publishedYear: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={bookData.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={bookData.author}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="publishedYear"
        placeholder="Published Year"
        value={bookData.publishedYear}
        onChange={handleChange}
      />
      <button type="submit">{editingBook ? 'Update' : 'Add'} Book</button>
    </form>
  );
};

export default BookForm;
