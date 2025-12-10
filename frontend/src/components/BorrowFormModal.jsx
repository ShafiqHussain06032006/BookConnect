import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const BorrowFormModal = ({ book, isOpen, onClose, onSubmit, type = 'borrow' }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    city: '',
    address: '',
    messageToOwner: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const result = await onSubmit(book.id, formData);
      if (result.success) {
        setSuccess(result.message || `${type === 'borrow' ? 'Borrow' : 'Purchase'} request submitted successfully!`);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError(result.message || 'Something went wrong');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const isPaid = book?.type === 'Paid' || book?.type === 'PAID';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-800">
            {isPaid ? 'Purchase Request' : 'Borrow Request'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-light"
          >
            ×
          </button>
        </div>

        {/* Book Info */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex gap-4">
            <img
              src={book?.imageUrl || book?.image}
              alt={book?.title}
              className="w-16 h-20 object-cover rounded-lg shadow"
            />
            <div>
              <h3 className="font-semibold text-gray-800">{book?.title}</h3>
              <p className="text-sm text-gray-500">by {book?.author}</p>
              {isPaid && (
                <p className="text-lg font-bold text-green-600 mt-1">
                  Rs. {book?.price}
                </p>
              )}
              <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                isPaid ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {isPaid ? 'Paid' : 'Free'}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="^[+]?[0-9]{10,15}$"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="+923001234567"
            />
            <p className="text-xs text-gray-500 mt-1">Include country code (e.g., +92)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your city"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              placeholder="Enter your complete address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message to Owner (Optional)
            </label>
            <textarea
              name="messageToOwner"
              value={formData.messageToOwner}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              placeholder="Any message you'd like to send to the book owner..."
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                isPaid
                  ? 'bg-green-600 hover:bg-green-700 disabled:bg-green-300'
                  : 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : isPaid ? (
                `Submit Purchase Request - Rs. ${book?.price}`
              ) : (
                'Submit Borrow Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BorrowFormModal;
