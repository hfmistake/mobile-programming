import React, { useState } from "react";
import {
  AlertInput,
  IonAlert,
  IonContent,
  IonPage,
  IonToast,
} from "@ionic/react";
import DisplayItems from "../components/DisplayItems";
import { useItemContext } from "../context/UseItemContext";
import { Item, itemSchema } from "../models/itemSchema";
import { FieldValues } from "react-hook-form";

const ToBuyItemsPage: React.FC = () => {
  const { tobuyItems, buyItem, loadItems, deleteItem, updateItem, createItem } =
    useItemContext();

  const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
  const [deleteItemId, setDeleteItemId] = React.useState<number | null>(null);

  const [showEditAlert, setShowEditAlert] = React.useState(false);
  const [editItem, setEditItem] = React.useState<Item | null>(null);

  const [showCreateAlert, setShowCreateAlert] = React.useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastColor, setToastColor] = React.useState("");
  const [toastMessage, setToastMessage] = React.useState("");
  const handleItemStatus = async (item_id: number) => {
    await buyItem(item_id.toString()).catch((error) => {
      console.error(error);
      setShowToast(true);
      setToastColor("danger");
      setToastMessage(
        "Erro ao conectar-se com o servidor! Tente novamente mais tarde.",
      );
    });
    await loadItems();
  };
  // noinspection DuplicatedCode
  const removeItem = async (item_id: number) => {
    await deleteItem(item_id.toString())
      .then(() => {
        setShowToast(true);
        setToastColor("success");
        setToastMessage("Item excluído com sucesso!");
      })
      .catch((error) => {
        console.error(error);
        setShowToast(true);
        setToastColor("danger");
        setToastMessage(
          "Erro ao conectar-se com o servidor! Tente novamente mais trade.",
        );
      });
    await loadItems();
  };

  // noinspection DuplicatedCode
  const handleDeleteItem = (item_id: number) => {
    setShowDeleteAlert(true);
    setDeleteItemId(item_id);
  };

  const handleEditItem = (item: Item) => {
    setShowEditAlert(true);
    setEditItem(item);
  };

  const putItem = async (id: number, item: Item) => {
    await updateItem(id.toString(), item).catch((error) => {
      console.error(error);
    });
    await loadItems();
  };

  const handleCreateItem = () => {
    setShowCreateAlert(true);
  };

  const postItem = async (item: Item) => {
    await createItem(item).catch((error) => {
      console.error(error);
    });
    await loadItems();
  };

  const generateItemInputs = (item: Item) => {
    return [
      {
        placeholder: "Nome: " + item.name,
        type: "text",
      },
      {
        placeholder: "Quantidade: " + item.quantity.toString(),
        type: "number",
      },
      {
        placeholder: "Preço: " + item.price.toString(),
        type: "number",
      },
    ] as AlertInput[];
  };

  const editHandler = async (alertData: FieldValues) => {
    const newItem: Item = {
      name: alertData["0"],
      quantity: alertData["1"],
      price: alertData["2"],
    };
    if (!itemSchema.safeParse(newItem).success) {
      setShowCreateAlert(false);
      setShowToast(true);
      setToastColor("danger");
      setToastMessage(
        "Erro ao editar Item! Certifique-se de digitar todos os valores",
      );
      return;
    }
    if (editItem) {
      const id = Number(editItem.id);
      await putItem(id, newItem)
        .then(() => {
          setEditItem(null);
          setShowEditAlert(false);
          setShowToast(true);
          setToastColor("success");
          setToastMessage("Item editado com sucesso!");
        })
        .catch((error) => {
          console.error(error);
          setEditItem(null);
          setShowEditAlert(false);
          setShowToast(true);
          setToastColor("danger");
          setToastMessage("Erro ao editar item!");
        });
    } else {
      console.error("Error while editing Item");
      setEditItem(null);
      setShowEditAlert(false);
      setShowToast(true);
      setToastColor("danger");
      setToastMessage("Erro ao editar item!");
    }
  };

  const createHandler = async (alertData: FieldValues) => {
    const newItem: Item = {
      name: alertData["0"],
      quantity: alertData["1"],
      price: alertData["2"],
    };
    if (!itemSchema.safeParse(newItem).success) {
      setShowCreateAlert(false);
      setShowToast(true);
      setToastColor("danger");
      setToastMessage(
        "Erro ao criar Item! Certifique-se de digitar todos os valores",
      );
      return;
    }
    await postItem(newItem)
      .then(() => {
        setShowCreateAlert(false);
        setShowToast(true);
        setToastColor("success");
        setToastMessage("Item adicionado com sucesso");
      })
      .catch((error) => {
        console.error(error);
        setShowCreateAlert(false);
        setShowToast(true);
        setToastColor("danger");
        setToastMessage("Erro ao adicionar item!");
      });
  };

  // noinspection DuplicatedCode
  return (
    <IonPage>
      <IonContent>
        <DisplayItems
          {...{
            items: tobuyItems,
            handleItemStatus,
            handleDeleteItem,
            handleEditItem,
            handleCreateItem,
          }}
        />
      </IonContent>
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header={"Tem certeza?"}
        message={"Deseja realmente excluir o item?"}
        buttons={[
          {
            text: "Cancelar",
            role: "cancel",
            handler: () => setDeleteItemId(null),
          },
          {
            text: "Excluir",
            role: "destructive",
            handler: () => removeItem(deleteItemId as number),
          },
        ]}
      />
      <IonAlert
        isOpen={showEditAlert}
        onDidDismiss={() => {
          setShowEditAlert(false);
          setEditItem(null);
        }}
        header="Editar Item"
        message={"Digite os novos valores"}
        inputs={editItem ? generateItemInputs(editItem as Item) : []}
        buttons={[
          {
            text: "Cancelar",
            role: "cancel",
            handler: () => setEditItem(null),
          },
          {
            text: "Salvar",

            handler: (alertData) => editHandler(alertData),
            role: "default",
          },
        ]}
      />
      <IonAlert
        isOpen={showCreateAlert}
        onDidDismiss={() => {
          setShowCreateAlert(false);
        }}
        header="Adicionar Item"
        message={"Digite os valores do novo item"}
        inputs={
          showCreateAlert
            ? ([
                {
                  placeholder: "Nome",
                  type: "text",
                },
                {
                  placeholder: "Quantidade",
                  type: "number",
                },
                {
                  placeholder: "Preço",
                  type: "number",
                },
              ] as AlertInput[])
            : []
        }
        buttons={[
          {
            text: "Cancelar",
            role: "cancel",
            handler: () => {
              setShowCreateAlert(false);
            },
          },
          {
            text: "Adicionar",
            handler: (alertData) => createHandler(alertData),
            role: "default",
          },
        ]}
      />
      <IonToast
        isOpen={showToast}
        message={toastMessage}
        duration={3000}
        color={toastColor}
        onDidDismiss={() => setShowToast(false)}
      />
    </IonPage>
  );
};

export default ToBuyItemsPage;
