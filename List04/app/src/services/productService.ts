import { axios } from "../lib/axios";
import { Product } from "../models/productSchema";

export const getProducts = async () => {
  const response = await axios.get("/products");
  return response.data["products"] as Product[];
};

export const addProduct = async (product: Product) => {
  const response = await axios.post("/products", product);
  return response.data;
};

export const getProduct = async (id: number) => {
  const response = await axios.get(`/products/${id}`);
  return response.data["product"] as Product;
};

export const deleteProduct = async (id: number) => {
  await axios.delete(`/products/${id}`);
};

export const editProduct = async (product: Product, id: number) => {
  await axios.put(`/products/${id}`, product);
};
