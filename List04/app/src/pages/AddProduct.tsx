import React from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle, IonToast,
  IonToolbar,
} from "@ionic/react";
import ProductForm from "../components/ProductForm";
import {FieldErrors, useForm} from "react-hook-form";
import {Product, productSchema} from "../models/productSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useProductContext} from "../context/UseProductContext";

const AddProduct: React.FC = () => {
  const {addProduct} = useProductContext();
  const {
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });

  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [toastColor, setToastColor] = React.useState("");


  const onSubmit = async (data: Product) => {
    await addProduct(data).then(() => {
          setShowToast(true);
          setToastMessage("Produto adicionado com sucesso");
          setToastColor("success");
        }
    ).catch((error) => {
          setShowToast(true);
          setToastMessage("Erro ao adicionar produto");
          setToastColor("danger");
          console.error(error);
        }
    );
  };

  const onError = (errors: FieldErrors<Product>) => {
    console.log(errors);
  };
  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Adicionar produto</IonTitle>
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
              {...{handleSubmit, register, errors, onSubmit, onError}}
          />
        </IonContent>
        <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={toastMessage}
            duration={2000}
            position="bottom"
            color={toastColor}
        ></IonToast>
      </IonPage>
  );
};

export default AddProduct;
