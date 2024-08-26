import { useContext } from "react";
import { ItemContext } from "./ItemContext";

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within the context");
  }
  return context;
};
