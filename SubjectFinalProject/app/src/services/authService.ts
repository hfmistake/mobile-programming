import { axios } from "../lib/axios";

export const login = async (password: string, email: string) => {
  const response = await axios.post("/login", { email, password });
  return response.data as boolean;
};

export const logout = async () => {
  const response = await axios.post("/logout");
  return response.data;
}
