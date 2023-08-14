import axios from "axios";
import { siteConfig } from "./site.consts";
import { toast } from "react-toastify";

const client = axios.create({
  baseURL: siteConfig.apiUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;

client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    toast.error(error.response.data.message);
    return Promise.reject(error);
  }
);
