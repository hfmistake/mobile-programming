import React, {createContext, ReactNode, useEffect} from "react";
import {Product} from "../models/productSchema";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
} from "../services/productService";
import {IonToast} from "@ionic/react";

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => Promise<void>;
  getProducts: () => Promise<void>;
  getProduct: (id: number) => Product | Promise<Product | undefined>;
  deleteProduct: (id: number) => void;
  editProduct: (newProduct: Product, id: number) => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(
    undefined,
);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
                                                                     children,
                                                                   }) => {
  const [products, setProducts] = React.useState([] as Product[]);
  const [showToast, setShowToast] = React.useState(false);

  const fetchProducts = async () => {
    const products = await getProducts();
    setProducts(products);
  };

  useEffect(() => {
    (async () => {
      await fetchProducts();
    })().catch((error) => {
      setShowToast(true);
      console.error(error);
    });
  }, []);

  const createProduct = async (product: Product) => {
    await addProduct(product).then(() => fetchProducts().catch((error) => {
      console.error(error)
    }));

  };

  const fetchProductById = async (id: number) => {
    try {
      return await getProduct(id);
    } catch (error) {
      console.error(error);
    }
  };

  const removeProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      await fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const modifyProduct = async (newProduct: Product, id: number) => {
    try {
      await editProduct(newProduct, id);
      await fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <ProductContext.Provider
          value={{
            products,
            getProducts: fetchProducts,
            addProduct: createProduct,
            getProduct: fetchProductById,
            deleteProduct: removeProduct,
            editProduct: modifyProduct,
          }}
      >
        {children}
        <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Erro ao carregar produtos"
            duration={2000}
            position="bottom"
            color={"danger"}
        />
      </ProductContext.Provider>
  );
};
