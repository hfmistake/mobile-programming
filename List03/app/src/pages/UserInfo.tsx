import React from "react";
import { useParams } from "react-router";
import { useUserContext } from "../context/UserContext";
import { IonContent, IonFabButton, IonPage } from "@ionic/react";
import { User } from "../models/userSchema";

function UserInfo() {
  const { id } = useParams<{ id: string }>();

  const { getUser } = useUserContext();

  const user = getUser(Number(id)) as User;

  if (!user) {
    return <h1>Usuário não encontrado</h1>;
  }
  return (
    <IonPage>
      <IonContent className={"ion-padding"}>
        <IonFabButton routerLink={"/users"}>Voltar</IonFabButton>
        <h1 className={"ion-text-center"}>Informações do Usuário</h1>
        <h3>Nome: {user.nome}</h3>
        <p>Idade: {user.idade}</p>
        <p>Email: {user.email}</p>
        <p>Telefone: {user.telefone}</p>
        <p>Endereço: {user.endereco}</p>
        <p>Gênero: {user.genero}</p>
        <p>Cidade: {user.cidade}</p>
        <p>Interesses:</p>
        <ul>
          {user.interesses.map((interesse) => (
            <li key={interesse}>{interesse}</li>
          ))}
        </ul>
        <p>Alertas: {user.alertas ? "ligado" : "desligado"}</p>
      </IonContent>
    </IonPage>
  );
}

export default UserInfo;
