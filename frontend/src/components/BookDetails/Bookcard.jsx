import { useState } from 'react';

const BookCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
      >
        <img
          src={book.image}
          alt={book.title}
          className="h-64 w-full object-cover"
        />
        <div className="p-4">
          <h3 className="font-bold text-lg">{book.title}</h3>
          <p className="text-sm text-gray-600">{book.author}</p>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {book.category}
          </span>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>
            <img
              src={book.image}
              alt={book.title}
              className="rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
            <p className="text-gray-600 mb-4">{book.description}</p>
            <div className="flex justify-end gap-2">
              {book.type === 'Free' ? (
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Borrow
                </button>
              ) : (
                <button className="bg-green-500 text-white px-4 py-2 rounded">
                  Buy Rs. {book.price}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;
