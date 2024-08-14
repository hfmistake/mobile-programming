import React, { createContext, ReactNode, useCallback } from "react";
import { Product } from "../models/productSchema";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
} from "../services/productService";

interface ProductContextType {
  addProduct: (product: Product) => Promise<void>;
  getProducts: () => Promise<Product[]>;
  getProduct: (id: number) => Promise<Product>;
  deleteProduct: (id: number) => Promise<void>;
  editProduct: (newProduct: Product, id: number) => Promise<void>;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined,
);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const fetchProducts = useCallback(async () => {
    return await getProducts().catch((error) => {
      console.error(error);
      throw new Error("Erro ao buscar produtos");
    });
  }, []);

  const createProduct = useCallback(async (product: Product) => {
    await addProduct(product).catch((error) => {
      console.error(error);
      throw new Error("Erro ao adicionar produto");
    });
  }, []);

  const fetchProductById = useCallback(async (id: number) => {
    return await getProduct(id).catch((error) => {
      console.error(error);
      throw new Error("Erro ao buscar produto");
    });
  }, []);

  const removeProduct = useCallback(async (id: number) => {
    await deleteProduct(id).catch((error) => {
      console.error(error);
      throw new Error("Erro ao deletar produto");
    });
  }, []);

  const modifyProduct = useCallback(async (newProduct: Product, id: number) => {
    await editProduct(newProduct, id).catch((error) => {
      console.error(error);
      throw new Error("Erro ao editar produto");
    });
  }, []);

  return (
    <ProductContext.Provider
      value={{
        getProducts: fetchProducts,
        addProduct: createProduct,
        getProduct: fetchProductById,
        deleteProduct: removeProduct,
        editProduct: modifyProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
