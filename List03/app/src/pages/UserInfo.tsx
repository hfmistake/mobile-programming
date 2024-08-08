import React from "react";
import { useParams } from "react-router";
import { useUserContext } from "../context/UserContext";
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
import { User } from "../models/userSchema";

function UserInfo() {
  const { id } = useParams<{ id: string }>();

  const { getUser } = useUserContext();

  const handleCityString = (city: string) => {
    // formato da cidade "sao-paulo" -> "São Paulo"
    return city
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const user = getUser(Number(id)) as User;

  if (!user) {
    return <h1>Usuário não encontrado</h1>;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalhes do Usuário</IonTitle>
          <IonButtons>
            <IonBackButton text={"Voltar"} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={"ion-padding"}>
        <IonCard>
          <IonCardHeader color={"primary"}>
            <IonCardTitle>{capitalize(user.nome)}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel>Idade:</IonLabel>
              <IonLabel>{user.idade}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Email:</IonLabel>
              <IonLabel>{user.email}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Telefone:</IonLabel>
              <IonLabel>{user.telefone}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Endereço:</IonLabel>
              <IonLabel>{user.endereco}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Cidade:</IonLabel>
              <IonLabel>{handleCityString(user.cidade)}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Gênero:</IonLabel>
              <IonLabel>{capitalize(user.genero)}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Interesses:</IonLabel>
              <IonLabel>
                {user.interesses.map((interesse) => (
                  <div key={interesse}>{capitalize(interesse)}</div>
                ))}
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Alertas:</IonLabel>
              <IonLabel>{user.alertas ? "Ligado" : "Desligado"}</IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}

export default UserInfo;
