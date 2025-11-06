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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`p-4 rounded-lg text-center transition-all shadow-sm hover:shadow-md ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl mb-2 block">{categoryIcons[category] || '📚'}</span>
              <span className="font-medium">{category}</span>
            </button>
          ))}
        </div>
      </div> {/* ✅ closed missing div */}
    </div>
  );
};

export default CategoryList;
