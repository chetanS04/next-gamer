import axiosLib from "axios";

const axios = axiosLib.create({
  baseURL: "http://localhost:8000",
  withCredentials: false, 
  headers: {
    "Accept": "application/json",
  },
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
