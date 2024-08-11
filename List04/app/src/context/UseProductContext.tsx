import React from "react";
import {ProductContext} from "./ProductContext";

export const useProductContext = () => {
  const context = React.useContext(ProductContext);
  if (context === undefined) {
    throw new Error(
        "useProductContext deve ser usado dentro de um ProductProvider",
    );
  }
  return context;
};
