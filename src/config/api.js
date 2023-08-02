import axios from "axios";
import { siteConfig } from "./site.consts";

const client = axios.create({
  baseURL: siteConfig.apiUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
