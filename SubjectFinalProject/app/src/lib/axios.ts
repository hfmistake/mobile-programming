import Axios from "axios";

const URL_API = "http://localhost:8000";
export const axios = Axios.create({
  baseURL: URL_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

