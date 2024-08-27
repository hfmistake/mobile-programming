import React from "react";
import { Item } from "../models/itemSchema";
import "./DisplayItems.css";
import {
  IonCheckbox,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
} from "@ionic/react";

interface DisplayItemsProps {
  items: Item[];
  handleItemStatus: (item_id: number) => void;
  handleDeleteItem: (item_id: number) => void;
  handleEditItem: (item: Item) => void;
  handleCreateItem: () => void;
}

const DisplayItems: React.FC<DisplayItemsProps> = ({
  items,
  handleItemStatus,
  handleDeleteItem,
  handleEditItem,
}) => {
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
    <>
      <IonList class="ion-padding">
        <IonItem className={"header-row"}>
          <IonLabel className="ion-text-center item-label ">Item</IonLabel>
          <IonLabel className="ion-text-center item-label">Quantidade</IonLabel>
          <IonLabel className="ion-text-center item-label">Preço</IonLabel>
          <IonLabel className="ion-text-center item-label">Adquirido</IonLabel>
        </IonItem>
        {items.map((item: Item, index: number) => (
          <IonItemSliding key={item.id}>
            <IonItem
              className={`item ${index % 2 === 0 ? "even-row" : "odd-row"}`}
            >
              <IonLabel class="ion-text-center item-label">
                {item.name}
              </IonLabel>
              <IonLabel class="ion-text-center item-label">
                {item.quantity}
              </IonLabel>
              <IonLabel class="ion-text-center item-label">
                {(item.price * item.quantity).toFixed(2)} R$
              </IonLabel>
              <IonLabel class="ion-text-center item-label">
                <IonCheckbox
                  className="checkbox"
                  justify={"end"}
                  labelPlacement={"stacked"}
                  checked={item.buyed}
                  onIonChange={() => handleItemStatus(item.id as number)}
                ></IonCheckbox>
              </IonLabel>
            </IonItem>
            <IonItemOptions side="end">
              <IonItemOption
                color="secondary"
                onClick={() => handleEditItem(item)}
              >
                Editar
              </IonItemOption>
              <IonItemOption
                color="danger"
                onClick={() => {
                  handleDeleteItem(item.id as number);
                }}
              >
                Excluir
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        ))}
      </IonList>
      <IonItem className="ion-text-end">
        <IonLabel>
          Totalizado na lista: {totalPrice.toFixed(2)} R$
        </IonLabel>
      </IonItem>

    </>
  );
};

export default DisplayItems;
