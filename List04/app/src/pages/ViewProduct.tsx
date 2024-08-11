import React from "react";
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import { useProductContext } from "../context/UseProductContext";

const ViewProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { products } = useProductContext();

  const product = products.find((product) => product.id === Number(id));

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };
  if (!product) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Produto não encontrado</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonTitle>Produto não encontrado</IonTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel>Produto não encontrado</IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Visualizar Produto</IonTitle>
          <IonButtons slot={"start"}>
            <IonBackButton
              text={"Voltar"}
              color={"secondary"}
              defaultHref={"/products"}
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={"ion-padding"}>
        <IonCard>
          <IonCardHeader color={"secondary"}>
            <IonCardTitle className={"ion-text-center"}>
              {product.name}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel slot={"start"}>Nome</IonLabel>
              <IonLabel slot={"end"}>{product.name}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel slot={"start"}>Descrição</IonLabel>
              <IonLabel slot={"end"}>{product.description}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel slot={"start"}>Preço</IonLabel>
              <IonLabel slot={"end"}>{formatPrice(Number(product.price))}</IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ViewProduct;
