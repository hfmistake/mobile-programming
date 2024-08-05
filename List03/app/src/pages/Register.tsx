import React, { useState } from "react";
import { IonContent, IonFabButton, IonPage, IonToast } from "@ionic/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../context/UserContext";
import { userSchema, User } from "../models/userSchema";
import UserForm from "../components/UserForm";

function Register() {
  const { addUser, getUsers } = useUserContext();
  const {
    reset,
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: getUsers().length + 1,
      cidade: "",
      genero: "",
      interesses: [],
      alertas: false,
    },
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");

  const onError = () => {
    setShowToast(true);
    setToastMessage("Erro ao salvar usuário");
    setToastColor("danger");
  };

  const onSubmit = (data: any) => {
    addUser(data);
    setShowToast(true);
    setToastMessage("Usuário salvo com sucesso");
    setToastColor("success");
    reset();
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
      <IonContent>
        <IonFabButton routerLink={"/users"}>Voltar</IonFabButton>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color={toastColor}
        ></IonToast>
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

export default Register;
