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
    'Fantasy',
  ]);

  const normalizeBook = (book) => {
    if (!book) return null;
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      category: book.category,
      type: book.type === 'PAID' ? 'Paid' : 'Free',
      price: book.price,
      image: book.imageUrl,
      imageUrl: book.imageUrl,
      isbn: book.isbn,
      language: book.language,
      pages: book.pages,
      uploaderId: book.uploaderId,
      uploaderName: book.uploaderName,
      available: book.available,
      createdAt: book.createdAt,
    };
  };

  // Fetch all books
  const fetchBooks = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await api.get('/books', { params: filters });
      const apiData = response?.data?.data;
      const incoming = apiData?.books || [];
      setBooks(incoming.map(normalizeBook));
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new book
  const addBook = async (bookData) => {
    try {
      const response = await api.post('/books', bookData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const newBook = normalizeBook(response?.data?.data);
      if (newBook) setBooks([newBook, ...books]);
      return { success: true, book: newBook };
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
      const book = normalizeBook(response?.data?.data);
      return { success: true, book };
    } catch (error) {
      console.error('Error fetching book:', error);
      return { success: false, message: 'Book not found' };
    }
  };

  // Borrow a book
  const borrowBook = async (bookId) => {
    try {
      const response = await api.post(`/books/${bookId}/borrow`);
      return { success: true, message: response?.data?.message || 'Book borrowed successfully' };
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
      return { success: true, message: response?.data?.message || 'Book purchased successfully' };
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
    const loadCategories = async () => {
      try {
        const res = await api.get('/books/categories');
        const cats = res?.data?.data;
        if (Array.isArray(cats) && cats.length) {
          setCategories(cats);
        }
      } catch (err) {
        console.error('Error loading categories', err);
      }
    };
    loadCategories();
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