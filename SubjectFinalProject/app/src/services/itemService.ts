import { axios } from "../lib/axios";
import { Item } from "../models/itemSchema";

export const getItems = async (): Promise<Item[]> => {
  const response = await axios.get("/items");
  return response.data["items"] as Item[];
};

export const addItem = async (item: Item) => {
  const response = await axios.post("/items", item);
  return response.data;
};

export const getItem = async (id: string) => {
  const response = await axios.get(`/items/${id}`);
  return response.data["item"] as Item;
};

export const deleteItem = async (id: string) => {
  await axios.delete(`/items/${id}`);
};

export const updateItem = async (id: string, item: Item) => {
  await axios.put(`/items/${id}`, item);
};

export const unbuyItem = async (id: string) => {
  await axios.delete(`/status/${id}`);
};

export const buyItem = async (id: string) => {
  await axios.post(`/status/${id}`);
};
