import React from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Product, productSchema } from "../models/productSchema";
import { useForm } from "react-hook-form";
import ProductForm from "../components/ProductForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router";
import { useProductContext } from "../context/UseProductContext";

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { products, editProduct } = useProductContext();

  const product = products.find((product) => product.id === Number(id));

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: product,
  });

  const onSubmit = (data: Product) => {
    console.log(data);
    editProduct(data, Number(id));
  };

  const onError = (errors: object) => {
    console.error(errors);
  };

  if (!product) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Editar produto</IonTitle>
            <IonButtons slot={"start"}>
              <IonBackButton
                text={"Voltar"}
                color={"secondary"}
                defaultHref={"/products"}
              />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <h1>Produto não encontrado</h1>
        </IonContent>
      </IonPage>
    );
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Editar produto</IonTitle>
          <IonButtons slot={"start"}>
            <IonBackButton
              text={"Voltar"}
              color={"secondary"}
              defaultHref={"/products"}
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ProductForm
          {...{
            handleSubmit,
            register,
            errors,
            onSubmit,
            onError,
            buttonText: "Editar",
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default EditProduct;
