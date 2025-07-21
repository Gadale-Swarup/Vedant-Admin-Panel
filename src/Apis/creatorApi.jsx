import axios from 'axios';
import { BASE_URL } from './api';

// Create an axios instance for creator APIs
const creatorApi = axios.create({
  baseURL: BASE_URL
});

// Add token to requests
creatorApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('creator_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Register a new creator
export const registerCreatorAPI = async (data) => {
  const response = await creatorApi.post('/creators/register', data);
  return response.data;
};

// Verify OTP
export const verifyOTPAPI = async (data) => {
  const response = await creatorApi.post('/creators/verify-otp', data);
  return response.data;
};

// Request login OTP
export const requestLoginOTPAPI = async (data) => {
  const response = await creatorApi.post('/creators/request-login-otp', data);
  return response.data;
};

// Get creator profile
export const getProfileAPI = async () => {
  const response = await creatorApi.get('/creators/profile');
  return response.data;
};

// Update creator profile
export const updateProfileAPI = async (formData) => {
  const response = await creatorApi.post('/creators/update-profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Upload consent video
export const uploadConsentVideoAPI = async (formData) => {
  const response = await creatorApi.post('/creators/upload-consent-video', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Get creator dashboard data
export const getCreatorDashboardAPI = async () => {
  const response = await creatorApi.get('/creators/dashboard');
  return response.data;
};

// Logout creator
export const logoutCreatorAPI = () => {
  localStorage.removeItem('creator_token');
};
