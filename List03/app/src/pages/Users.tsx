import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import {
  IonAlert,
  IonFabButton,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

function Users() {
  const { getUsers, deleteUser } = useUserContext();

  const navigate = useHistory();

  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  function handleUserClick(id: number) {
    navigate.push(`/users/${id}`);
  }

  function handleDeleteUser(id: number) {
    setItemToDelete(id);
    setShowAlert(true);
  }

  return (
    <div>
      <IonFabButton routerLink={"/register"}>Cadastrar</IonFabButton>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Confirmação de exclusão"}
        message={"Tem certeza que deseja excluir este usuário?"}
        buttons={[
          {
            text: "Cancelar",
            role: "cancel",
            handler: () => {
              setItemToDelete(null);
            },
          },
          {
            text: "Excluir",
            handler: () => {
              deleteUser(itemToDelete as number);
              setItemToDelete(null);
            },
          },
        ]}
      />

      <h1>Usuários</h1>
      <ul>
        {getUsers().map((user) => (
          <li key={user.nome}>
            <IonItemSliding>
              <IonItem button onClick={() => handleUserClick(user.id)}>
                <IonLabel>{user.nome}</IonLabel>
              </IonItem>
              <IonItemOptions>
                <IonItemOption
                    onClick={() => navigate.push(`/edit/${user.id}`)}
                >Editar</IonItemOption>
                <IonItemOption
                  color="danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Excluir
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
