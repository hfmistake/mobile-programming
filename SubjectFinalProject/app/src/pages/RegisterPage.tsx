import React, {useState} from "react";
import { User, registerSchema, RegisterType } from "../models/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {IonContent, IonPage, IonToast} from "@ionic/react";
import { useForm } from "react-hook-form";
import RegisterForm from "../components/RegisterForm";
import { useUserContext } from "../context/UseUserContext";
import {useHistory} from "react-router";

const RegisterPage: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastColor, setToastColor] = useState<string>("");
  const history = useHistory();

  const { userRegister } = useUserContext();
  const onSubmit = async (data: RegisterType) => {
    const { name, email, password } = data;
    const user: User = {
      name: name,
      email: email,
      password: password,
    };
    await userRegister(user).then((
    ) => {
      history.push('/login/login?message=Cadastro%20bem%20sucedido%21%20Realize%20o%20login%20para%20continuar.');
    }).catch((error) => {
      console.error(error);
      setShowToast(true)
      setToastColor("danger");
      setToastMessage("Erro ao conectar-se com o servidor! Tente novamente mais tarde.");
    });
  };

  const onError = (errors: object) => {
    console.error(errors);
  };
  return (
    <IonPage>
      <IonContent>
        <RegisterForm
          {...{
            handleSubmit,
            onSubmit,
            onError,
            errors,
            register,
            userRegister: userRegister,
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

export default RegisterPage;
