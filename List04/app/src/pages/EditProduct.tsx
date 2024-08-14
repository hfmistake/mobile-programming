import React, { useEffect } from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToast,
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

  const { editProduct, getProduct } = useProductContext();

  const [product, setProduct] = React.useState<Product>();

  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [toastColor, setToastColor] = React.useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: product,
  });

  useEffect(() => {
    (async () => {
      await getProduct(Number(id)).then((product) => {
        setProduct(product);
        reset(product);
      });
    })().catch((error) => {
      console.error(error);
    });
  }, [getProduct, id, reset]);

  const onSubmit = async (data: Product) => {
    console.log(data);
    await editProduct(data, Number(id))
      .then(() => {
        setToastMessage("Produto editado com sucesso");
        setToastColor("success");
        setShowToast(true);
      })
      .catch((error) => {
        console.error(error);
        setToastMessage("Erro ao editar produto");
        setToastColor("danger");
        setShowToast(true);
      });
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
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000}
        position="bottom"
        color={toastColor}
      />
    </IonPage>
  );
};

export default EditProduct;
