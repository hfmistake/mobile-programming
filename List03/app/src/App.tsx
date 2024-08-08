import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Register from "./pages/Register";
import Users from "./pages/Users";
import { UserProvider } from "./context/UserContext";
import UserInfo from "./pages/UserInfo";
import React from "react";
import EditUser from "./pages/EditUser";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <UserProvider>
          <Route exact path={"/"}>
            <Redirect to={"/users"} />
          </Route>
          <Route exact path={"/users/:id"} component={UserInfo} />
          <Route exact path={"/users/:id/edit"} component={EditUser} />
          <Route exact path={"/users"} component={Users} />
          <Route exact path={"/register"} component={Register} />
        </UserProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
