import axios, { InternalAxiosRequestConfig } from "axios";
import { getToken } from "../utils/auth";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

instance.interceptors.request.use(
  (config): InternalAxiosRequestConfig => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
