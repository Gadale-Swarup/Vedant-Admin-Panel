import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// Base URL for the API
export const BASE_URL = "http://localhost:8000/api";
export const IMG_URL = "http://localhost:8000";

// export const BASE_URL = "https://app.simora.ai/api";
// export const IMG_URL = "https://app.simora.ai";

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  Promise.reject
);

// Utility Functions
// export const getToken = () => {
//   const token = localStorage.getItem('token')
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token)
//       if (decodedToken.exp < Date.now() / 1000) {
//         // Token has expired, remove it from local storage and redirect to login page
//         localStorage.removeItem('token')
//         history.push('/login')
//         throw new Error('Token has expired')
//       }
//       return token
//       // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       // Token is malformed or invalid, remove it from local storage and redirect to login page

//       localStorage.removeItem('token')
//       history.push('/login')
//       throw new Error('Invalid token')
//     }
//   }
//   return null
// }

export const getToken = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        // Token has expired, remove it from local storage and return null
        localStorage.removeItem("accessToken");
        return null;
      }
      return token;
    } catch (error) {
      // Token is malformed or invalid, remove it from local storage and return null
      localStorage.removeItem("accessToken");
      return null;
    }
  }
  return null;
};

// Usage
export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const token = getToken();
  if (!token) {
    // Token is invalid or expired, redirect to login page
    navigate("/login");
  }
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logoutAPI = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

// Generalized API Request Function
const apiRequest = async (endpoint, data = null, method = "post") => {
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await api.request({
    url: endpoint,
    method,
    data,
    headers,
  });
  return response.data;
};

// Authentication APIs
export const loginAPI = async (payload) => {
  const data = await apiRequest("/users/login", payload);
  if (data?.token) {
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  }
  return data;
};

export const getUsers = (params) => {
  return api.get("/users/getAll", { params });
};

export const createUser = (data) => {
  return api.post("/users/register", data);
};

export const updateUser = (id, data) => {
  return api.post(`/users/updateUser/${id}`, data);
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
}; 