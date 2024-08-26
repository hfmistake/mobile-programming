import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { useUserContext } from "../context/UseUserContext";
import { User } from "../models/userSchema";
import { useAuthContext } from "../context/UseAuthContext";

const UserPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { getCurrentUser } = useUserContext();
  const { logout } = useAuthContext();

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      setUser(user);
    })().catch(console.error);
  }, [getCurrentUser]);

  if (!user) {
    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Usuário não encontrado</IonTitle>
            </IonToolbar>
          </IonHeader>
        </IonPage>
    );
  }

  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="ion-text-center">Informações do Usuário</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle className={"ion-text-center"}>{user.name}</IonCardTitle>
              <IonCardSubtitle className={"ion-text-center"}>{user.email}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonButton expand="full" className="ion-color ion-color-danger" onClick={logout}>
                Logout
              </IonButton>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
  );
};

export default UserPage;
