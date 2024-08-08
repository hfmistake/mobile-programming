import React from "react";
import StudentForm from "../components/StudentForm";
import { useForm } from "react-hook-form";
import { Student, studentSchema } from "../models/studentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

function Register() {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Student>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      cursos: [],
      bilingue: false,
    },
  });

  const onError = () => {
    console.log("Erro ao salvar usuário verifique os campos do formulário.");
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };
  const handleCursosItem = (item: string) => {
    const interesses = getValues("cursos");
    const newInteresses = interesses.includes(item)
      ? interesses.filter((interesse) => interesse !== item)
      : [...interesses, item];
    setValue("cursos", newInteresses);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className={"ion-text-center"}>Cadastro de Aluno</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={"ion-padding"}>
        <StudentForm
          {...{
            register,
            errors,
            setValue,
            getValues,
            handleSubmit,
            onSubmit,
            onError,
            handleCursosItem,
          }}
        />
      </IonContent>
    </IonPage>
  );
}

export default Register;
