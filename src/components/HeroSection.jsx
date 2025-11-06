import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' ... %3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-6">
              Find, Borrow, or Buy Books Instantly
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Discover and share your favorite books with readers everywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/browse"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 shadow-lg text-center"
              >
                Browse Books
              </Link>
              <Link
                to="/upload"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 border-2 border-white text-center"
              >
                Upload Your Book
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=600&fit=crop"
              alt="Books"
              className="rounded-2xl shadow-2xl w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
