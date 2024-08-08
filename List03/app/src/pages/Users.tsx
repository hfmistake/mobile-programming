import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import {
  IonAlert,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { add } from "ionicons/icons";

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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Usuários</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={"ion-padding"}>
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
        <IonList>
          {getUsers().map((user) => (
            <IonItemSliding key={user.id}>
              <IonItem button onClick={() => handleUserClick(user.id)}>
                <IonLabel>{user.nome}</IonLabel>
              </IonItem>
              <IonItemOptions>
                <IonItemOption routerLink={`/users/${user.id}/edit`}>
                  Editar
                </IonItemOption>
                <IonItemOption
                  color="danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Excluir
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
        <IonFab
          vertical="bottom"
          horizontal="end"
          slot="fixed"
          className={"ion-margin"}
        >
          <IonFabButton color="primary" routerLink={"/register"}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
}

export default Users;
