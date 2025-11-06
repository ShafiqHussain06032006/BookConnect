import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../../context/Bookcontext';
import { useAuth } from '../../context/AuthContext';

const UploadBook = () => {
  const navigate = useNavigate();
  const { addBook, categories } = useBooks();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    category: 'Fiction',
    type: 'Free',
    price: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setFormData({
        ...formData,
        image: file,
      });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.title || !formData.author || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.type === 'Paid' && (!formData.price || formData.price <= 0)) {
      setError('Please enter a valid price for paid books');
      return;
    }

    // Prepare form data for upload
    const uploadData = new FormData();
    uploadData.append('title', formData.title);
    uploadData.append('author', formData.author);
    uploadData.append('description', formData.description);
    uploadData.append('category', formData.category);
    uploadData.append('type', formData.type);
    if (formData.type === 'Paid') {
      uploadData.append('price', formData.price);
    }
    if (formData.image) {
      uploadData.append('image', formData.image);
    }

    setLoading(true);
    const result = await addBook(uploadData);
    setLoading(false);

    if (result.success) {
      alert('Book uploaded successfully!');
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Upload Your Book</h1>
          <p className="text-gray-600">Share your books with the community</p>
        </div>

        {/* Upload Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>
              <div className="flex items-center space-x-6">
                <div className="shrink-0">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-32 w-24 object-cover rounded-lg shadow-md"
                    />
                  ) : (
                    <div className="h-32 w-24 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <label className="block">
                  <span className="sr-only">Choose book cover</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
                  />
                  <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </label>
              </div>
            </div>

            {/* Book Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Book Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter book title"
              />
            </div>

            {/* Author */}
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                Author *
              </label>
              <input
                id="author"
                name="author"
                type="text"
                required
                value={formData.author}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter author name"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Book Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                required
                value={formData.description}
                onChange={handleChange}
                className="input-field resize-none"
                placeholder="Enter a detailed description of the book"
              />
            </div>

            {/* Category and Type Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Book Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Book Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="Free">Free</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
            </div>

            {/* Price (conditional) */}
            {formData.type === 'Paid' && (
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price (Rs.) *
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="1"
                  required={formData.type === 'Paid'}
                  value={formData.price}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter price in Rupees"
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Uploading...' : 'Upload Book'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-primary-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-2">📌 Upload Guidelines</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-500 mr-2">•</span>
              <span>Ensure the book cover image is clear and high quality</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-500 mr-2">•</span>
              <span>Provide accurate book information and author details</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-500 mr-2">•</span>
              <span>Free books can be borrowed by any user</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-500 mr-2">•</span>
              <span>Set a fair price for paid books</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadBook;
