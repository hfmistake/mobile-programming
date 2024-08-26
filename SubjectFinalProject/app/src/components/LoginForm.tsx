import React from "react";
import { IonButton, IonInput, IonItem } from "@ionic/react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { LoginType } from "../models/userSchema";

interface LoginFormProps {
  register: UseFormRegister<LoginType>;
  handleSubmit: UseFormHandleSubmit<LoginType>;
  onSubmit: SubmitHandler<LoginType>;
  errors: FieldErrors<LoginType>;
  onError: (errors: object) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  register,
  handleSubmit,
  onSubmit,
  onError,
  errors,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <IonItem>
        <IonInput
          label={"E-mail"}
          labelPlacement={"floating"}
          aria-label="email"
          className={`${errors.email ? "ion-invalid ion-touched" : ""}`}
          errorText={errors.email?.message}
          type={"email"}
          {...register("email")}
        />
      </IonItem>
      <IonItem>
        <IonInput
          label={"Senha"}
          labelPlacement={"floating"}
          aria-label="Senha"
          className={`${errors.password ? "ion-invalid ion-touched" : ""}`}
          errorText={errors.password?.message}
          type={"password"}
          {...register("password")}
          onKeyDown={(e: React.KeyboardEvent<HTMLIonInputElement>) => {
            if (e.key === "Enter") {
              (e.target as HTMLInputElement).blur();
              (e.target as HTMLInputElement).focus();
            }
          }}
        />
      </IonItem>
      <IonButton expand={"full"} type="submit">
        Login
      </IonButton>
    </form>
  );
};

export default LoginForm;
