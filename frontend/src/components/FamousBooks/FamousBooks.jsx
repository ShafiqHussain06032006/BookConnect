import { useBooks } from '../../context/Bookcontext';
import { Link } from 'react-router-dom';

const FamousBooks = () => {
  const { books, loading } = useBooks();
  
  // Get first 8 books to display as "famous/featured" books
  const featuredBooks = books.slice(0, 8);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Featured Books</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-xl mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (featuredBooks.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Featured Books</h2>
          <p className="text-gray-600 mb-6">No books available yet. Be the first to share!</p>
          <Link 
            to="/upload" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Upload a Book
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Featured Books</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing books shared by our community members
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <Link 
              to="/browse" 
              key={book.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={book.image || book.imageUrl || '/placeholder-book.png'}
                  alt={book.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
                />
                <span className={`absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full ${
                  book.type === 'Paid' || book.type === 'PAID' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {book.type === 'Paid' || book.type === 'PAID' ? `Rs. ${book.price}` : 'Free'}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-1">{book.author}</p>
                <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {book.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link 
            to="/browse" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Browse All Books
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FamousBooks;
