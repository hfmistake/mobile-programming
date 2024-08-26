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
import React from "react";
import LoginTabs from "./pages/LoginTabs";
import { UserProvider } from "./context/UserContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import UserPage from "./pages/UserPage";
import { NonAuthenticatedRoute } from "./routes/NonAuthenticatedRoute";
import { AuthProvider } from "./context/AuthContext";
import ShoppingItemsTabs from "./pages/ShoppingItemsTabs";
import AddItemPage from "./pages/AddItemPage";
import { ItemProvider } from "./context/ItemContext";
import "./App.css"

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <UserProvider>
          <AuthProvider>
            <ItemProvider>
              <Route exact path="/">
                <Redirect to={"/login"} />:
              </Route>
              <NonAuthenticatedRoute component={LoginTabs} path={"/login"} />
              <ProtectedRoute component={ShoppingItemsTabs} path={"/items"} />
            </ItemProvider>
          </AuthProvider>
        </UserProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
