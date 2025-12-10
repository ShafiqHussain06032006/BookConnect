import { useState } from 'react';
import { useBooks } from '../../context/Bookcontext';
import BorrowFormModal from '../BorrowFormModal';

const BookCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const { borrowBook, buyBook } = useBooks();
  const [actionMessage, setActionMessage] = useState('');
  const [actionError, setActionError] = useState('');

  const handleBorrowSubmit = async (bookId, formData) => {
    setActionError('');
    const res = await borrowBook(bookId, formData);
    if (!res.success) {
      setActionError(res.message);
      return res;
    } else {
      setActionMessage(res.message);
      setShowModal(false);
      return res;
    }
  };

  const handleBuySubmit = async (bookId, formData) => {
    setActionError('');
    const res = await buyBook(bookId, formData);
    if (!res.success) {
      setActionError(res.message);
      return res;
    } else {
      setActionMessage(res.message);
      setShowModal(false);
      return res;
    }
  };

  const displayType = book.type === 'Paid' || book.type === 'PAID' ? 'Paid' : 'Free';

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
      >
        <img
          src={book.image || book.imageUrl}
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
              src={book.image || book.imageUrl}
              alt={book.title}
              className="rounded-lg mb-4 w-full h-48 object-cover"
            />
            <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
            <p className="text-gray-500 text-sm mb-1">by {book.author}</p>
            <p className="text-gray-600 mb-4">{book.description}</p>
            {actionError && <p className="text-red-600 mb-3 text-sm">{actionError}</p>}
            {actionMessage && <p className="text-green-600 mb-3 text-sm">{actionMessage}</p>}
            <div className="flex justify-end gap-2">
              {displayType === 'Free' ? (
                <button 
                  onClick={() => setShowBorrowModal(true)} 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Borrow
                </button>
              ) : (
                <button 
                  onClick={() => setShowBorrowModal(true)} 
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Buy Rs. {book.price}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Borrow/Buy Form Modal */}
      <BorrowFormModal
        book={book}
        isOpen={showBorrowModal}
        onClose={() => setShowBorrowModal(false)}
        onSubmit={displayType === 'Free' ? handleBorrowSubmit : handleBuySubmit}
        type={displayType === 'Free' ? 'borrow' : 'buy'}
      />
    </>
  );
};

export default BookCard;
