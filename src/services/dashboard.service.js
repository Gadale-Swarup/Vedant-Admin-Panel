import { apiRequest } from '../Apis/api.jsx';

/**
 * Get all dashboard data in one request
 * @returns {Promise} Promise object with dashboard data
 */
export const getAllDashboardData = async () => {
  return await apiRequest('/dashboard/getAllDashboardData', null, 'get');
};

/**
 * Get dashboard statistics
 * @returns {Promise} Promise object with dashboard stats
 */
export const getDashboardStats = async () => {
  return await apiRequest('/dashboard/stats', null, 'get');
};

/**
 * Get recent videos
 * @returns {Promise} Promise object with recent videos
 */
export const getRecentVideos = async () => {
  return await apiRequest('/dashboard/recent-videos', null, 'get');
};

/**
 * Get recent transactions
 * @returns {Promise} Promise object with recent transactions
 */
export const getRecentTransactions = async () => {
  return await apiRequest('/dashboard/recent-transactions', null, 'get');
};

/**
 * Get daily video generation data
 * @returns {Promise} Promise object with daily generation data
 */
export const getDailyGeneration = async () => {
  return await apiRequest('/dashboard/daily-generation', null, 'get');
};

/**
 * Get subscription distribution
 * @returns {Promise} Promise object with subscription distribution
 */
export const getSubscriptionDistribution = async () => {
  return await apiRequest('/dashboard/subscription-distribution', null, 'get');
};

/**
 * Get revenue data
 * @returns {Promise} Promise object with revenue data
 */
export const getRevenueData = async () => {
  return await apiRequest('/dashboard/revenue-data', null, 'get');
};

/**
 * Get points usage data
 * @returns {Promise} Promise object with points usage data
 */
export const getPointsUsageData = async () => {
  return await apiRequest('/dashboard/points-usage', null, 'get');
}; 