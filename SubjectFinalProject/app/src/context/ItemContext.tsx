import { Item } from "../models/itemSchema";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  addItem,
  buyItem,
  deleteItem,
  getItem,
  getItems,
  unbuyItem,
  updateItem,
} from "../services/itemService";
import { useAuthContext } from "./UseAuthContext";

interface ItemContextTypes {
  getItems: () => Promise<Item[]>;
  getItemById: (id: string) => Promise<Item>;
  createItem: (item: Item) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  updateItem: (id: string, item: Item) => Promise<void>;
  unbuyItem: (id: string) => Promise<void>;
  buyItem: (id: string) => Promise<void>;
  loadItems: () => Promise<Item[] | void>;
  buyedItems: Item[];
  tobuyItems: Item[];
}

export const ItemContext = createContext<ItemContextTypes | undefined>(
  undefined,
);

export const ItemProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [buyedItems, setBuyedItems] = useState<Item[]>([]);
  const [tobuyItems, setTobuyItems] = useState<Item[]>([]);
  const { isAuthenticated } = useAuthContext();
  const loadItems = useCallback(async () => {
    await getItems()
      .then((items) => {
        setTobuyItems(items.filter((item) => !item.buyed));
        setBuyedItems(items.filter((item) => item.buyed));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadItems().then();
    }
  }, [isAuthenticated, loadItems]);

  const fetchItems = useCallback(async () => {
    return await getItems().catch((error) => {
      console.error("Error occurred in fetchItems", error);
      throw new Error("Error occured in fetchItems");
    });
  }, []);

  const fetchItem = useCallback(async (id: string) => {
    return await getItem(id).catch((error) => {
      console.error("Error occured in fetchItem", error);
      throw new Error("Error occurred in fetchItem");
    });
  }, []);

  const createItem = useCallback(async (item: Item) => {
    return await addItem(item).catch((error) => {
      console.error("Error occured in createItem", error);
      throw new Error("Error occurred in createItem");
    });
  }, []);

  const removeItem = useCallback(async (id: string) => {
    return await deleteItem(id).catch((error) => {
      console.error("Error ocurred in removeItem", error);
    });
  }, []);

  const editItem = useCallback(async (id: string, item: Item) => {
    return await updateItem(id, item).catch((error) => {
      console.error("Error occurred in updateItem", error);
    });
  }, []);

  const buyStatus = useCallback(async (id: string) => {
    return await buyItem(id).catch((error) => {
      console.error("Error occured in buyItem", error);
      throw new Error("Error occured in buyItem");
    });
  }, []);

  const unbuyStatus = useCallback(async (id: string) => {
    return await unbuyItem(id).catch((error) => {
      console.error("Error occured in unbuyItem", error);
      throw new Error("Error occured in unbuyItem");
    });
  }, []);

  return (
    <ItemContext.Provider
      value={{
        getItems: fetchItems,
        getItemById: fetchItem,
        deleteItem: removeItem,
        createItem,
        updateItem: editItem,
        unbuyItem: unbuyStatus,
        buyItem: buyStatus,
        tobuyItems,
        buyedItems,
        loadItems,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
