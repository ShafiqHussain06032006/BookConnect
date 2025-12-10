import { createContext, useState, useContext } from 'react';
import api from '../api/axios';

export const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  const [stats, setStats] = useState(null);
  const [borrowRequestsSent, setBorrowRequestsSent] = useState([]);
  const [borrowRequestsReceived, setBorrowRequestsReceived] = useState([]);
  const [purchasesMade, setPurchasesMade] = useState([]);
  const [purchaseRequestsReceived, setPurchaseRequestsReceived] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user stats
  const fetchStats = async () => {
    try {
      const response = await api.get('/dashboard/stats');
      setStats(response?.data?.data);
      return { success: true, stats: response?.data?.data };
    } catch (error) {
      console.error('Error fetching stats:', error);
      return { success: false, message: 'Failed to fetch stats' };
    }
  };

  // Fetch borrow requests sent by user
  const fetchBorrowRequestsSent = async () => {
    setLoading(true);
    try {
      const response = await api.get('/dashboard/borrow/sent');
      setBorrowRequestsSent(response?.data?.data || []);
      return { success: true, requests: response?.data?.data || [] };
    } catch (error) {
      console.error('Error fetching borrow requests sent:', error);
      return { success: false, message: 'Failed to fetch borrow requests' };
    } finally {
      setLoading(false);
    }
  };

  // Fetch borrow requests received by user (as book owner)
  const fetchBorrowRequestsReceived = async () => {
    setLoading(true);
    try {
      const response = await api.get('/dashboard/borrow/received');
      setBorrowRequestsReceived(response?.data?.data || []);
      return { success: true, requests: response?.data?.data || [] };
    } catch (error) {
      console.error('Error fetching borrow requests received:', error);
      return { success: false, message: 'Failed to fetch borrow requests' };
    } finally {
      setLoading(false);
    }
  };

  // Delete a borrow request
  const deleteBorrowRequest = async (borrowId) => {
    try {
      await api.delete(`/dashboard/borrow/${borrowId}`);
      setBorrowRequestsSent(borrowRequestsSent.filter(r => r.id !== borrowId));
      return { success: true, message: 'Borrow request deleted' };
    } catch (error) {
      console.error('Error deleting borrow request:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to delete borrow request' 
      };
    }
  };

  // Fetch purchases made by user
  const fetchPurchasesMade = async () => {
    setLoading(true);
    try {
      const response = await api.get('/dashboard/purchases');
      setPurchasesMade(response?.data?.data || []);
      return { success: true, purchases: response?.data?.data || [] };
    } catch (error) {
      console.error('Error fetching purchases:', error);
      return { success: false, message: 'Failed to fetch purchases' };
    } finally {
      setLoading(false);
    }
  };

  // Fetch purchase requests received by user (as book owner)
  const fetchPurchaseRequestsReceived = async () => {
    setLoading(true);
    try {
      const response = await api.get('/dashboard/purchases/received');
      setPurchaseRequestsReceived(response?.data?.data || []);
      return { success: true, purchases: response?.data?.data || [] };
    } catch (error) {
      console.error('Error fetching purchase requests received:', error);
      return { success: false, message: 'Failed to fetch purchase requests' };
    } finally {
      setLoading(false);
    }
  };

  // Delete a purchase request
  const deletePurchaseRequest = async (purchaseId) => {
    try {
      await api.delete(`/dashboard/purchases/${purchaseId}`);
      setPurchasesMade(purchasesMade.filter(p => p.id !== purchaseId));
      return { success: true, message: 'Purchase request deleted' };
    } catch (error) {
      console.error('Error deleting purchase request:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to delete purchase request' 
      };
    }
  };

  // Generate WhatsApp link
  const getWhatsAppLink = (phone, bookTitle) => {
    const message = encodeURIComponent(`Hello, I received your request for the book "${bookTitle}"`);
    // Remove any non-numeric characters except +
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  const value = {
    stats,
    borrowRequestsSent,
    borrowRequestsReceived,
    purchasesMade,
    purchaseRequestsReceived,
    loading,
    fetchStats,
    fetchBorrowRequestsSent,
    fetchBorrowRequestsReceived,
    deleteBorrowRequest,
    fetchPurchasesMade,
    fetchPurchaseRequestsReceived,
    deletePurchaseRequest,
    getWhatsAppLink,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};
