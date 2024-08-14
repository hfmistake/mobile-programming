import {
  IonAlert,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect } from "react";
import { add, pencil, trash } from "ionicons/icons";
import { useProductContext } from "../context/UseProductContext";
import { useHistory } from "react-router";
import { Product } from "../models/productSchema";

const Products: React.FC = () => {
  const { deleteProduct, getProducts } = useProductContext();
  const [showToast, setShowToast] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);
  const navigate = useHistory();

  useEffect(() => {
    (async () => {
      await getProducts().then((products) => setProducts(products));
    })().catch(() => {
      setToastColor("danger");
      setToastMessage("Erro ao carregar produtos");
      setShowToast(true);
    });
  }, [getProducts]);

  const handleProductClick = (id: number) => {
    navigate.push(`/products/${id}`);
  };

  const [productToDelete, setProductToDelete] = React.useState<number | null>(
    null,
  );
  const [showAlert, setShowAlert] = React.useState(false);

  const [toastMessage, setToastMessage] = React.useState("");
  const [toastColor, setToastColor] = React.useState("");

  const handleDeleteProduct = (id: number) => {
    setShowAlert(true);
    setProductToDelete(id);
  };
  const handleRefresh = async (event: CustomEvent) => {
    await getProducts()
      .then((products) => {
        setProducts(products);
      })
      .catch(() => {
        setShowToast(true);
      })
      .finally(() => event.detail.complete());
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className={"ion-text-center"}>Produtos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={"ion-padding ion-margin"}>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Tem certeza?"}
          message={"Deseja realmente deletar este produto?"}
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
              handler: () => {
                setProductToDelete(null);
              },
            },
            {
              text: "Deletar",
              handler: async () => {
                await deleteProduct(productToDelete as number)
                  .then(() => {
                    setToastMessage("Produto deletado com sucesso");
                    setToastColor("success");
                    setShowToast(true);
                    getProducts().then((products) => setProducts(products));
                  })
                  .catch(() => {
                    setToastMessage("Erro ao deletar produto");
                    setToastColor("danger");
                    setShowToast(true);
                  })
                  .finally(() => {
                    setProductToDelete(null);
                  });
              },
            },
          ]}
        />
        <IonList>
          {products.map((product) => (
            <IonItemSliding key={product.id}>
              <IonItem
                button
                onClick={() => handleProductClick(product.id as number)}
              >
                <IonLabel>
                  <h2>{product.name}</h2>
                </IonLabel>
              </IonItem>
              <IonItemOptions>
                <IonItemOption routerLink={`/products/${product.id}/edit`}>
                  <IonIcon icon={pencil} className={"ion-margin"} />
                </IonItemOption>
                <IonItemOption
                  color="danger"
                  onClick={() => handleDeleteProduct(product.id as number)}
                >
                  <IonIcon icon={trash} className={"ion-margin"} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
        <IonFab
          vertical="bottom"
          horizontal="end"
          slot="fixed"
          className={"ion-margin"}
        >
          <IonFabButton color="secondary" routerLink={"/products/add"}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
      </IonContent>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000}
        position="bottom"
        color={toastColor}
      />
    </IonPage>
  );
};

export default Products;
