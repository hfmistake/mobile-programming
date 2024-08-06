import React, { useState } from "react";
import { IonContent, IonFabButton, IonPage, IonToast } from "@ionic/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../context/UserContext";
import { userSchema, User } from "../models/userSchema";
import { useParams } from "react-router";
import UserForm from "../components/UserForm";

function EditUser() {
  const { id } = useParams<{ id: string }>();

  const { getUser, editUser } = useUserContext();
  const user = getUser(Number(id));
  if (!user) {
    return <h1>Usuário não encontrado</h1>;
  }

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: user,
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");

  const onError = () => {
    setShowToast(true);
    setToastMessage("Erro ao editar usuário");
    setToastColor("danger");
  };

  const onSubmit = (data: any) => {
    setShowToast(true);
    setToastMessage("Usuário editado com sucesso");
    setToastColor("success");
    editUser(data, Number(id));
  };

  const handleInteresseItem = (item: string) => {
    const interesses = getValues("interesses");
    const newInteresses = interesses.includes(item)
      ? interesses.filter((interesse) => interesse !== item)
      : [...interesses, item];
    setValue("interesses", newInteresses);
  };

  return (
    <IonPage>
      <IonContent className={"ion-padding"}>
        <IonFabButton routerLink={"/users"}>Voltar</IonFabButton>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color={toastColor}
        ></IonToast>
        <h1>Editando {user.nome}</h1>
        <UserForm
          {...{
            register,
            errors,
            setValue,
            getValues,
            handleSubmit,
            onSubmit,
            onError,
            handleInteresseItem,
          }}
        />
      </IonContent>
    </IonPage>
  );
}

export default EditUser;
