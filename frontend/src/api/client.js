import axios from "axios";
import { API_BASE_URL } from "../config/runtime.js";

const apiClient = axios.create({
  baseURL: API_BASE_URL || undefined,
  withCredentials: true,
});

export default apiClient;
