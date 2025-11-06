import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

export const BookContext = createContext(null);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([
    'Fiction',
    'Romance',
    'Mystery / Thriller',
    'Self-Help / Motivational',
    'Fantasy'
  ]);

  // Fetch all books
  const fetchBooks = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await api.get('/books', { params: filters });
      setBooks(response.data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch books when component mounts
  useEffect(() => {
    fetchBooks();
  }, []); // Empty dependency array means this runs once when component mounts

  // Add a new book
  const addBook = async (bookData) => {
    try {
      const response = await api.post('/books', bookData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setBooks([response.data.book, ...books]);
      return { success: true, book: response.data.book };
    } catch (error) {
      console.error('Error adding book:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add book' 
      };
    }
  };

  // Get book by ID
  const getBookById = async (bookId) => {
    try {
      const response = await api.get(`/books/${bookId}`);
      return { success: true, book: response.data.book };
    } catch (error) {
      console.error('Error fetching book:', error);
      return { success: false, message: 'Book not found' };
    }
  };

  // Borrow a book
  const borrowBook = async (bookId) => {
    try {
      const response = await api.post(`/books/${bookId}/borrow`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error borrowing book:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to borrow book' 
      };
    }
  };

  // Buy a book
  const buyBook = async (bookId) => {
    try {
      const response = await api.post(`/books/${bookId}/buy`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error buying book:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to buy book' 
      };
    }
  };

  // Fetch books when component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  const value = {
    books,
    loading,
    categories,
    fetchBooks,
    addBook,
    getBookById,
    borrowBook,
    buyBook,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within BookProvider');
  }
  return context;
};