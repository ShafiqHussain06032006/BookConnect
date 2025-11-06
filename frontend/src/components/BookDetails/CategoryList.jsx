const CategoryList = ({ selectedCategory, onSelectCategory }) => {
  const categoryIcons = {
    Fiction: '📖',
    Romance: '💕',
    'Mystery / Thriller': '🔍',
    'Self-Help / Motivational': '💪',
    Fantasy: '🐉',
  };

  const categories = [
    'Fiction',
    'Romance',
    'Mystery / Thriller',
    'Self-Help / Motivational',
    'Fantasy',
  ];

  const allCategories = ['All', ...categories];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Explore Categories
        </h2>

        <div className="flex flex-wrap gap-2 justify-center">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-1">{categoryIcons[category] || '📚'}</span>
              <span className="font-medium">{category}</span>
            </button>
          ))}
        </div>
      </div> {/* ✅ closed missing div */}
    </div>
  );
};

export default CategoryList;
