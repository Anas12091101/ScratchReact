import axios from "axios";
import { getAuthToken } from "./utils/auth";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      //   config.headers["Content-Type"] = "application/json";
    }
    console.log(config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    toast.error(
      error.response ? error.response.data.message : "Something bad happended"
    );
    if (error.response.status === 401) {
      return redirect("/auth?mode=login");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
