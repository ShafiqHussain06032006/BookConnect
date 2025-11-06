import { useState, useEffect } from 'react';
import { useBooks } from '../../context/Bookcontext';
import BookCard from '../../components/BookDetails/Bookcard';
import CategoryList from '../../components/BookDetails/CategoryList';

const Browse = () => {
  const { books, loading } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    let result = books;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(book => book.category === selectedCategory);
    }
    
    setFilteredBooks(result);
  }, [books, searchTerm, selectedCategory]);

  return (
    <div>
      {/* Search Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Browse Books
          </h1>
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search books by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg shadow-lg border-none focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
              />
              <span className="absolute right-3 top-3 text-gray-400">🔍</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <CategoryList 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory}
      />

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading books...</p>
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-xl">No books found matching your criteria.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
