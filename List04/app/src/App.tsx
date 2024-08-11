import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Products from "./pages/Products";

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
import React from "react";
import AddProduct from "./pages/AddProduct";
import { ProductProvider } from "./context/ProductContext";
import ViewProduct from "./pages/ViewProduct";
import EditProduct from "./pages/EditProduct";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <ProductProvider>
          <Switch>
            <Route exact path={"/products/add"} component={AddProduct} />
            <Route exact path={"/products/:id"} component={ViewProduct} />
          </Switch>
          <Route exact path={"/products/:id/edit"} component={EditProduct} />
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/">
            <Redirect to="/products" />
          </Route>
        </ProductProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
