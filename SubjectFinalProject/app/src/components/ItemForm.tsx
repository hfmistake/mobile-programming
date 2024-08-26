import React from "react";
import {IonButton, IonInput, IonItem} from "@ionic/react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { Item } from "../models/itemSchema";

interface ItemFormProps {
  register: UseFormRegister<Item>;
  handleSubmit: UseFormHandleSubmit<Item>;
  onSubmit: SubmitHandler<Item>;
  errors: FieldErrors<Item>;
  onError: (errors: object) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({
  handleSubmit,
  register,
  onSubmit,
  onError,
  errors,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <IonItem>
        <IonInput
          className={`${errors.name ? "ion-invalid ion-touched" : ""}`}
          label={"Nome"}
          labelPlacement={"floating"}
          type={"text"}
          aria-label={"Nome"}
          {...register("name")}
          errorText={errors.name?.message}
        />
      </IonItem>
      <IonItem>
        <IonInput
          className={`${errors.quantity ? "ion-invalid ion-touched" : ""}`}
          label={"Quantidade"}
          labelPlacement={"floating"}
          aria-label={"Quantidade"}
          type="number"
          {...register("quantity")}
          errorText={errors.quantity?.message}
        />
      </IonItem>
      <IonItem>
        <IonInput
          className={`${errors.price ? "ion-invalid ion-touched" : ""}`}
          label={"Preço"}
          labelPlacement={"floating"}
          type={"number"}
          step={"0.001"}
          aria-label={"Preço"}
          {...register("price")}
          errorText={errors.price?.message}
        />
      </IonItem>
      <IonButton expand={"full"} type={"submit"}>Adicionar</IonButton>
    </form>
  );
};

export default ItemForm;
