import { useEffect, useState } from 'react';
import { useBooks } from '../../context/Bookcontext';

const MyBooks = () => {
  const { myBooks, fetchMyBooks, updateBook, deleteBook, loading } = useBooks();
  const [editingBook, setEditingBook] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    borrowable: true,
    purchasable: true,
  });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchMyBooks();
  }, []);

  const handleEdit = (book) => {
    setEditingBook(book.id);
    setEditForm({
      title: book.title,
      author: book.author,
      description: book.description || '',
      price: book.price || '',
      borrowable: book.borrowable,
      purchasable: book.purchasable,
    });
  };

  const handleSave = async () => {
    const success = await updateBook(editingBook, editForm);
    if (success) {
      setEditingBook(null);
    }
  };

  const handleDelete = async (bookId) => {
    const success = await deleteBook(bookId);
    if (success) {
      setDeleteConfirm(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Books</h1>

      {myBooks.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No books uploaded yet</h3>
          <p className="text-gray-500 mb-4">Start sharing your books with the community!</p>
          <a
            href="/upload"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Upload Your First Book
          </a>
        </div>
      ) : (
        <div className="grid gap-4">
          {myBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-xl p-6 shadow-sm">
              {editingBook === book.id ? (
                /* Edit Mode */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                      <input
                        type="text"
                        value={editForm.author}
                        onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                      <input
                        type="number"
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`borrowable-${book.id}`}
                        checked={editForm.borrowable}
                        onChange={(e) => setEditForm({ ...editForm, borrowable: e.target.checked })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <label htmlFor={`borrowable-${book.id}`} className="text-sm text-gray-700">
                        Available for Borrow
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`purchasable-${book.id}`}
                        checked={editForm.purchasable}
                        onChange={(e) => setEditForm({ ...editForm, purchasable: e.target.checked })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <label htmlFor={`purchasable-${book.id}`} className="text-sm text-gray-700">
                        Available for Purchase
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingBook(null)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="flex items-start gap-4">
                  {book.imageUrl ? (
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-24 h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-24 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                    <p className="text-sm text-gray-600">by {book.author}</p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{book.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {book.borrowable && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Borrowable
                        </span>
                      )}
                      {book.purchasable && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          ₹{book.price}
                        </span>
                      )}
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {book.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleEdit(book)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(book.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              )}

              {/* Delete Confirmation */}
              {deleteConfirm === book.id && (
                <div className="mt-4 pt-4 border-t bg-red-50 -mx-6 -mb-6 px-6 py-4 rounded-b-xl">
                  <p className="text-red-700 font-medium mb-3">
                    Are you sure you want to delete "{book.title}"?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Yes, Delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
