import React from "react";
import {
  IonContent,
  IonPage,
} from "@ionic/react";
import { FieldErrors, useForm } from "react-hook-form";
import { Item, itemSchema } from "../models/itemSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ItemForm from "../components/ItemForm";
import { useItemContext } from "../context/UseItemContext";

const AddItemPage: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Item>({
    resolver: zodResolver(itemSchema),
  });

  const { loadItems, createItem } = useItemContext();
  const onSubmit = async (data: Item) => {
    await createItem(data)
      .then(() => loadItems())
      .catch((error) => {
        console.log(error);
      });
  };

  const onError = (errors: FieldErrors<Item>) => {
    console.error(errors);
  };
  return (
    <IonPage>
      <IonContent>
        <ItemForm
          {...{
            handleSubmit,
            register,
            errors,
            onError,
            onSubmit,
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddItemPage;
