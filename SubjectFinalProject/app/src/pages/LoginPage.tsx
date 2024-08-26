import React, { useEffect, useState } from "react";
import { IonContent, IonPage, IonToast } from "@ionic/react";
import LoginForm from "../components/LoginForm";
import { FieldErrors, useForm } from "react-hook-form";
import { loginSchema, LoginType } from "../models/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "../context/UseAuthContext";
import { useHistory, useLocation } from "react-router";

const LoginPage: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastColor, setToastColor] = useState<string>("");
  const location = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get("message");
  useEffect(() => {
    if (message) {
      setShowToast(true);
      setToastColor("success");
      setToastMessage(decodeURIComponent(message));
      history.replace("/login/login");
    }
  }, [history, message]);
  const { login } = useAuthContext();
  const { setIsAuthenticated } = useAuthContext();
  const onSubmit = async (data: LoginType) => {
    await login(data.password, data.email)
      .then(() => setIsAuthenticated(true))
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          setShowToast(true);
          setToastColor("danger");
          setToastMessage("Servidor indisponível. Tente novamente mais tarde.");
          return;
        }
        setShowToast(true);
        setToastColor("danger");
        setToastMessage(error.response?.data?.detail);
      });
  };

  const onError = (errors: FieldErrors<LoginType>) => {
    console.error(errors);
  };
  return (
    <IonPage>
      <IonContent>
        <LoginForm
          {...{
            handleSubmit,
            register,
            errors,
            onError,
            onSubmit,
          }}
        />
      </IonContent>
      <IonToast
        isOpen={showToast}
        message={String(toastMessage)}
        duration={3000}
        color={toastColor}
        onDidDismiss={() => setShowToast(false)}
      />
    </IonPage>
  );
};

export default LoginPage;
