import React from "react";
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { cart, cartOutline, person } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import BuyedItemsPage from "./BuyedItemsPage";
import ToBuyItemsPage from "./ToBuyItemsPage";
import UserPage from "./UserPage";
import AddItemPage from "./AddItemPage";

const ShoppingItemsTabs: React.FC = () => {
  return (
    <IonPage>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/items" to="/items/tobuy" />
          <Route exact path="/items/tobuy">
            <ToBuyItemsPage />
          </Route>
          <Route exact path="/items/buyed">
            <BuyedItemsPage />
          </Route>
          <Route exact path="/items/user/me">
            <UserPage />
          </Route>
          <Route exact path="/items/add">
            <AddItemPage />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="top">
          <IonTabButton tab={"user"} href={"/items/user/me"}>
            <IonIcon icon={person} />
            <IonLabel>Usuário</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tobuy" href="/items/tobuy">
            <IonIcon icon={cartOutline} />
            <IonLabel>Não Adquiridos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="buyed" href="/items/buyed">
            <IonIcon icon={cart} />
            <IonLabel>Adquiridos</IonLabel>
          </IonTabButton>
          {/*<IonTabButton tab="add" href={"/items/add"}>*/}
          {/*  <IonIcon icon={addCircleOutline} />*/}
          {/*  <IonLabel>Adicionar Item</IonLabel>*/}
          {/*</IonTabButton>*/}
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
};

export default ShoppingItemsTabs;
