import { useState, useEffect } from 'react';
import BookCard from '../../components/BookDetails/Bookcard';
import CategoryList from '../../components/BookDetails/CategoryList';

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Sample books data (same as Home page)
  const books = [
    {
      id: 1,
      title: 'The Great Adventure',
      author: 'John Smith',
      category: 'Fiction',
      image:
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      description: 'An epic tale of courage and discovery.',
      type: 'Free',
    },
    {
      id: 2,
      title: 'Love in Paris',
      author: 'Emma Wilson',
      category: 'Romance',
      image:
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
      description: 'A heartwarming romance set in the city of lights.',
      type: 'Paid',
      price: 500,
    },
  ];

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
  }, [searchTerm, selectedCategory]); // Removed books dependency since it's now static

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
        {filteredBooks.length > 0 ? (
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
