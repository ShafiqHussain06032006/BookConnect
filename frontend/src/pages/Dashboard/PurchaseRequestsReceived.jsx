import { useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';

const PurchaseRequestsReceived = () => {
  const { purchaseRequestsReceived, fetchPurchaseRequestsReceived, loading, getWhatsAppLink } = useDashboard();

  useEffect(() => {
    fetchPurchaseRequestsReceived();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Purchase Requests Received</h1>

      {purchaseRequestsReceived.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No purchase requests received</h3>
          <p className="text-gray-500">Upload more books for sale to get purchase requests!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {purchaseRequestsReceived.map((purchase) => (
            <div key={purchase.id} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                {purchase.bookImageUrl ? (
                  <img
                    src={purchase.bookImageUrl}
                    alt={purchase.bookTitle}
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
                      <h3 className="text-lg font-semibold text-gray-800">{purchase.bookTitle}</h3>
                      <p className="text-sm text-gray-600">by {purchase.bookAuthor}</p>
                    </div>
                    <span className="text-lg font-bold text-green-600">₹{purchase.amount}</span>
                  </div>
                  
                  {/* Buyer Details */}
                  <div className="mt-4 bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-2">Buyer Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <p><span className="text-gray-500">Name:</span> {purchase.buyerName}</p>
                      <p><span className="text-gray-500">Phone:</span> {purchase.buyerPhone}</p>
                      <p><span className="text-gray-500">City:</span> {purchase.buyerCity}</p>
                      <p><span className="text-gray-500">Address:</span> {purchase.buyerAddress}</p>
                    </div>
                    {purchase.messageToOwner && (
                      <div className="mt-3 pt-3 border-t border-green-200">
                        <p className="text-sm text-gray-500">Message:</p>
                        <p className="text-sm text-gray-700 italic">"{purchase.messageToOwner}"</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Purchased:</span> {new Date(purchase.purchasedAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={getWhatsAppLink(
                        purchase.buyerPhone,
                        `Hi ${purchase.buyerName}! Regarding your purchase of "${purchase.bookTitle}" for ₹${purchase.amount} - `
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Contact Buyer on WhatsApp
                    </a>
                    
                    <a
                      href={`tel:${purchase.buyerPhone}`}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Buyer
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchaseRequestsReceived;
