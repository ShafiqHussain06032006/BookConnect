import { useState, useEffect } from 'react';

const FamousBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFamousBooks = async () => {
      try {
        // Using Google Books API to fetch bestsellers/popular books
        const response = await fetch(
          'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=relevance&maxResults=12'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        
        const data = await response.json();
        
        const formattedBooks = data.items?.map((item) => ({
          id: item.id,
          title: item.volumeInfo?.title || 'Unknown Title',
          author: item.volumeInfo?.authors?.[0] || 'Unknown Author',
          coverImage: item.volumeInfo?.imageLinks?.thumbnail?.replace('http:', 'https:') || null,
          rating: item.volumeInfo?.averageRating || null,
          publishedDate: item.volumeInfo?.publishedDate?.substring(0, 4) || null,
        })) || [];
        
        setBooks(formattedBooks.filter(book => book.coverImage));
      } catch (err) {
        console.error('Error fetching famous books:', err);
        // Fallback to curated list with real covers
        setBooks([
          {
            id: '1',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            coverImage: 'https://covers.openlibrary.org/b/id/7222246-M.jpg',
            rating: 4.5,
            publishedDate: '1925',
          },
          {
            id: '2',
            title: '1984',
            author: 'George Orwell',
            coverImage: 'https://covers.openlibrary.org/b/id/7222336-M.jpg',
            rating: 4.7,
            publishedDate: '1949',
          },
          {
            id: '3',
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            coverImage: 'https://covers.openlibrary.org/b/id/8228691-M.jpg',
            rating: 4.8,
            publishedDate: '1960',
          },
          {
            id: '4',
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            coverImage: 'https://covers.openlibrary.org/b/id/8479576-M.jpg',
            rating: 4.6,
            publishedDate: '1813',
          },
          {
            id: '5',
            title: 'The Catcher in the Rye',
            author: 'J.D. Salinger',
            coverImage: 'https://covers.openlibrary.org/b/id/8231488-M.jpg',
            rating: 4.3,
            publishedDate: '1951',
          },
          {
            id: '6',
            title: 'Harry Potter',
            author: 'J.K. Rowling',
            coverImage: 'https://covers.openlibrary.org/b/id/10521270-M.jpg',
            rating: 4.9,
            publishedDate: '1997',
          },
          {
            id: '7',
            title: 'The Hobbit',
            author: 'J.R.R. Tolkien',
            coverImage: 'https://covers.openlibrary.org/b/id/6979861-M.jpg',
            rating: 4.7,
            publishedDate: '1937',
          },
          {
            id: '8',
            title: 'Brave New World',
            author: 'Aldous Huxley',
            coverImage: 'https://covers.openlibrary.org/b/id/5112241-M.jpg',
            rating: 4.4,
            publishedDate: '1932',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFamousBooks();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Popular Books
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Discover bestselling titles loved by readers worldwide
            </p>
          </div>
          <div className="flex justify-center items-center py-16">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">
            Trending Now
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Popular Books
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore timeless classics and contemporary bestsellers that have captivated millions of readers
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {books.slice(0, 12).map((book) => (
            <div
              key={book.id}
              className="group cursor-pointer"
            >
              {/* Book Cover */}
              <div className="relative mb-3 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                <div className="aspect-[2/3] bg-gray-100">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150x225?text=No+Cover';
                    }}
                  />
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 left-3 right-3">
                    {book.rating && (
                      <div className="flex items-center gap-1 text-white text-sm">
                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                        <span>{book.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Book Info */}
              <div className="px-1">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {book.title}
                </h3>
                <p className="text-gray-500 text-xs mt-1 truncate">{book.author}</p>
                {book.publishedDate && (
                  <p className="text-gray-400 text-xs mt-0.5">{book.publishedDate}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FamousBooks;
