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

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Reset password error handling
    if (error.response.data?.password) {
      error.response.data?.password.map((err) => toast.error(err));
    }
    //
    if (error.response.data?.message.email) {
      error.response.data?.message.email.map((err) => toast.error(err));
    }
    // Backend API error handling
    else {
      toast.error(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.detail
          ? error.response.data.detail
          : "Something bad happended"
      );
    }
    if (error.response.status === 401) {
      localStorage.clear();
      let path = window.location.pathname;
      return redirect("/auth?mode=login?next=" + path.slice(1));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
