import axios from "axios";
import { getTokenFromLocalStorage } from "../auth/HelperAuth";
import { BASE_URL } from "./helper.service";

export const publicAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

privateAxios.interceptors.request.use(
  (config) => {
    //request mein modification karenge
    const token = getTokenFromLocalStorage();
    if (token) {
      console.log(config.headers);
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
