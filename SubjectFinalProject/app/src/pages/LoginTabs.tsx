import React from "react";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import {personAddSharp, personSharp} from "ionicons/icons";
import {Redirect, Route} from "react-router-dom";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";

const LoginTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path={"/login"} to={"/login/login"}/>
        <Route exact path="/login/register">
          <RegisterPage />
        </Route>
        <Route exact path="/login/login">
          <LoginPage />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot={"top"}>
        <IonTabButton tab="tab1" href="/login/login">
          <IonIcon icon={personSharp} />
          <IonLabel>Login</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href={"/login/register"}>
          <IonIcon icon={personAddSharp} />
          <IonLabel>Cadastre-se</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default LoginTabs;
