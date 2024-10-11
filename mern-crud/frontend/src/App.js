import React, { useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

const App = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  return (
    <div className="App">
      <h1>Book Manager</h1>
      <BookForm
        books={books}
        setBooks={setBooks}
        editingBook={editingBook}
        setEditingBook={setEditingBook}
      />
      <BookList
        books={books}
        setBooks={setBooks}
        setEditingBook={setEditingBook}
      />
    </div>
  );
};

export default App;
