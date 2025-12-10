import { useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';

const PurchasesMade = () => {
  const { purchasesMade, fetchPurchasesMade, loading, getWhatsAppLink } = useDashboard();

  useEffect(() => {
    fetchPurchasesMade();
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Purchases</h1>

      {purchasesMade.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No purchases yet</h3>
          <p className="text-gray-500 mb-4">Browse books and make your first purchase!</p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Books
          </a>
        </div>
      ) : (
        <div className="grid gap-4">
          {purchasesMade.map((purchase) => (
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
                  
                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Seller:</span> {purchase.ownerName}</p>
                    <p><span className="font-medium">Purchased:</span> {new Date(purchase.purchasedAt).toLocaleDateString()}</p>
                    {purchase.messageToOwner && (
                      <p className="italic text-gray-500">"{purchase.messageToOwner}"</p>
                    )}
                  </div>

                  <div className="mt-4 flex gap-2">
                    {purchase.ownerPhone && (
                      <a
                        href={getWhatsAppLink(purchase.ownerPhone, `Hi! Regarding my purchase of "${purchase.bookTitle}"`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp Seller
                      </a>
                    )}
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

export default PurchasesMade;
