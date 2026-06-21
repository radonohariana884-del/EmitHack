import axios from "axios";

const base = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export const api = axios.create({
  baseURL: base,
  headers: {
    "Content-Type": "application/json",
  },
});
