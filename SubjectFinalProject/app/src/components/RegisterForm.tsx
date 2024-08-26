import React from "react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { RegisterType } from "../models/userSchema";
import { IonButton, IonInput, IonItem } from "@ionic/react";

interface RegisterFormProps {
  handleSubmit: UseFormHandleSubmit<RegisterType>;
  register: UseFormRegister<RegisterType>;
  errors: FieldErrors<RegisterType>;
  onSubmit: SubmitHandler<RegisterType>;
  onError: (errors: object) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  handleSubmit,
  onSubmit,
  onError,
  errors,
  register,
}: RegisterFormProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <IonItem>
        <IonInput
          label={"Nome"}
          labelPlacement={"floating"}
          aria-label={"Nome"}
          {...register("name")}
          type="text"
          className={`${errors.name ? "ion-invalid ion-touched" : ""}`}
          errorText={errors.name?.message}
        />
      </IonItem>
      <IonItem>
        <IonInput
          label={"E-mail"}
          labelPlacement={"floating"}
          aria-label={"E-mail"}
          {...register("email")}
          className={`${errors.email ? "ion-invalid ion-touched" : ""}`}
          type={"email"}
          errorText={errors.email?.message}
        />
      </IonItem>
      <IonItem>
        <IonInput
          label={"Senha"}
          labelPlacement={"floating"}
          aria-label={"Senha"}
          {...register("password")}
          className={`${errors.password ? "ion-invalid ion-touched" : ""}`}
          type={"password"}
          errorText={errors.password?.message}
        />
      </IonItem>
      <IonItem>
        <IonInput
          label={"Confirmar Senha"}
          labelPlacement={"floating"}
          aria-label={"Confirmar Senha"}
          {...register("confirmPassword")}
          type={"password"}
          className={`${errors.confirmPassword ? "ion-invalid ion-touched" : ""}`}
          errorText={errors.confirmPassword?.message}
        />
      </IonItem>
      <IonButton expand={"full"} type="submit">
        Cadastrar
      </IonButton>
    </form>
  );
};

export default RegisterForm;
