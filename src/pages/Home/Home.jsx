import { useState } from 'react';
import HeroSection from '../../components/HeroSection';
import CategoryList from '../../components/BookDetails/CategoryList';
import BookCard from '../../components/BookDetails/Bookcard';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'Fiction',
    'Romance',
    'Mystery / Thriller',
    'Self-Help / Motivational',
    'Fantasy',
  ];

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

  const filteredBooks =
    selectedCategory === 'All'
      ? books
      : books.filter((b) => b.category === selectedCategory);

  return (
    <div>
      <HeroSection />
      <CategoryList
        categories={categories}
        onCategorySelect={setSelectedCategory}
      />
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;
