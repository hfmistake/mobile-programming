import Axios from "axios";

export const axios = Axios.create({
  baseURL: "https://mobileapi-production-0b1c.up.railway.app",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});