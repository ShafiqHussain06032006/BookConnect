import { useEffect, useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';

const RequestsSent = () => {
  const { borrowRequestsSent, fetchBorrowRequestsSent, deleteBorrowRequest, loading, getWhatsAppLink } = useDashboard();
  const [cancelConfirm, setCancelConfirm] = useState(null);

  useEffect(() => {
    fetchBorrowRequestsSent();
  }, []);

  const handleCancel = async (requestId) => {
    const success = await deleteBorrowRequest(requestId);
    if (success) {
      setCancelConfirm(null);
      fetchBorrowRequestsSent();
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'APPROVED':
        return 'bg-green-100 text-green-700';
      case 'REJECTED':
        return 'bg-red-100 text-red-700';
      case 'RETURNED':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Borrow Requests Sent</h1>

      {borrowRequestsSent.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No borrow requests sent</h3>
          <p className="text-gray-500 mb-4">Browse books and send borrow requests!</p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Books
          </a>
        </div>
      ) : (
        <div className="grid gap-4">
          {borrowRequestsSent.map((request) => (
            <div key={request.id} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                {request.bookImageUrl ? (
                  <img
                    src={request.bookImageUrl}
                    alt={request.bookTitle}
                    className="w-20 h-28 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-20 h-28 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{request.bookTitle}</h3>
                      <p className="text-sm text-gray-600">by {request.bookAuthor}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(request.status)}`}>
                      {request.status || 'PENDING'}
                    </span>
                  </div>
                  
                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Owner:</span> {request.ownerName}</p>
                    <p><span className="font-medium">Requested:</span> {new Date(request.borrowedAt).toLocaleDateString()}</p>
                    {request.messageToOwner && (
                      <p className="italic text-gray-500">"{request.messageToOwner}"</p>
                    )}
                  </div>

                  <div className="mt-4 flex gap-2">
                    {request.ownerPhone && (
                      <a
                        href={getWhatsAppLink(request.ownerPhone, `Hi! Regarding my borrow request for "${request.bookTitle}"`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp Owner
                      </a>
                    )}
                    
                    {request.status?.toUpperCase() === 'PENDING' && (
                      <button
                        onClick={() => setCancelConfirm(request.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm"
                      >
                        Cancel Request
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Cancel Confirmation */}
              {cancelConfirm === request.id && (
                <div className="mt-4 pt-4 border-t bg-red-50 -mx-6 -mb-6 px-6 py-4 rounded-b-xl">
                  <p className="text-red-700 font-medium mb-3">
                    Cancel borrow request for "{request.bookTitle}"?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCancel(request.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Yes, Cancel
                    </button>
                    <button
                      onClick={() => setCancelConfirm(null)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                      Keep Request
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

export default RequestsSent;
