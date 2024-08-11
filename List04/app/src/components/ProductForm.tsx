import React from "react";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonTextarea,
} from "@ionic/react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { Product } from "../models/productSchema";
import { save } from "ionicons/icons";

interface FormProps {
  handleSubmit: UseFormHandleSubmit<Product>;
  register: UseFormRegister<Product>;
  errors: FieldErrors<Product>;
  onSubmit: SubmitHandler<Product>;
  onError: (errors: object) => void;
}

const ProductForm: React.FC<FormProps> = ({
  handleSubmit,
  register,
  errors,
  onSubmit,
  onError,
}: FormProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <IonItem>
        <IonInput
          className={`${errors.name ? "ion-invalid ion-touched" : ""}`}
          label={"Nome"}
          aria-label={"nome"}
          type={"text"}
          labelPlacement={"floating"}
          {...register("name")}
          errorText={errors.name?.message}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonInput
          className={`${errors.price ? "ion-invalid ion-touched" : ""}`}
          label={"Preço"}
          aria-label={"preço"}
          type={"number"}
          step={"0.01"}
          labelPlacement={"floating"}
          {...register("price")}
          errorText={errors.price?.message}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonTextarea
          className={`${errors.description ? "ion-invalid ion-touched" : ""}`}
          label={"Descrição"}
          aria-label={"descrição"}
          {...register("description")}
          labelPlacement={"floating"}
          errorText={errors.description?.message}
        ></IonTextarea>
      </IonItem>
      <IonButton type={"submit"} expand={"full"}>
        <IonIcon slot={"end"} icon={save} />
        Salvar
      </IonButton>
    </form>
  );
};

export default ProductForm;
