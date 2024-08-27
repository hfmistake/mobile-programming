import { axios } from "../lib/axios";
import { User } from "../models/userSchema";

export const getCurrentUser = async () => {
  const response = await axios.get("/user");
  return response.data as User;
};
export const register = async (user: User) => {
  await axios.post("/register", user).catch((err) => {
    console.error(err)
    throw err;
  });
};
