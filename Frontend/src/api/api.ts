// src/api/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://sarao-backend.example.com/api ", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for auth tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
