import { useEffect, useState } from 'react';
import HeroSection from '../../components/HeroSection';
import CategoryList from '../../components/BookDetails/CategoryList';
import BookCard from '../../components/BookDetails/Bookcard';
import { useBooks } from '../../context/Bookcontext';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { books, loading, fetchBooks, categories } = useBooks();

  useEffect(() => {
    fetchBooks(selectedCategory === 'All' ? {} : { category: selectedCategory });
  }, [selectedCategory]);

  return (
    <div>
      <HeroSection />
      <CategoryList
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={categories}
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="col-span-full text-center text-gray-500 text-lg py-12">Loading books...</p>
          ) : books.length > 0 ? (
            books.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg py-12">
              No books found in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
