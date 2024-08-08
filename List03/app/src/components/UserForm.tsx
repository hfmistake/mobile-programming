import React from "react";
import {
  IonButton,
  IonCheckbox,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToggle,
} from "@ionic/react";
import { create } from "ionicons/icons";

function UserForm({
  register,
  errors,
  setValue,
  getValues,
  handleSubmit,
  onSubmit,
  onError,
  handleInteresseItem,
}: any) {
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <IonList>
        <IonItem className={"ion-margin-bottom"}>
          <IonInput
            className={`${errors.nome ? "ion-invalid ion-touched" : ""}`}
            aria-label={"Nome"}
            {...register("nome")}
            name={"nome"}
            type={"text"}
            label={"Nome"}
            labelPlacement={"floating"}
            errorText={errors.nome?.message}
          />
        </IonItem>
        <IonItem className={"ion-margin-bottom"}>
          <IonInput
            className={`${errors.idade ? "ion-invalid ion-touched" : ""}`}
            aria-label={"Idade"}
            {...register("idade")}
            name={"idade"}
            type={"number"}
            label={"Idade"}
            labelPlacement={"floating"}
            errorText={errors.idade?.message}
          />
        </IonItem>
        <IonItem className={"ion-margin-bottom"}>
          <IonInput
            className={`${errors.email ? "ion-invalid ion-touched" : ""}`}
            aria-label={"Email"}
            {...register("email")}
            name={"email"}
            type={"email"}
            label={"Email"}
            labelPlacement={"floating"}
            errorText={errors.email?.message}
          />
        </IonItem>
        <IonItem className={"ion-margin-bottom"}>
          <IonInput
            className={`${errors.telefone ? "ion-invalid ion-touched" : ""}`}
            aria-label={"Telefone"}
            {...register("telefone")}
            name={"telefone"}
            type={"tel"}
            label={"Telefone"}
            labelPlacement={"floating"}
            errorText={errors.telefone?.message}
          />
        </IonItem>
        <IonItem className={"ion-margin-bottom"}>
          <IonInput
            className={`${errors.endereco ? "ion-invalid ion-touched" : ""}`}
            aria-label={"Endereço"}
            {...register("endereco")}
            name={"endereco"}
            type={"text"}
            label={"Endereço"}
            labelPlacement={"floating"}
            errorText={errors.endereco?.message}
          />
        </IonItem>
        <IonList className={"ion-padding"}>
          <IonLabel>Gênero</IonLabel>
          <IonRadioGroup
            value={getValues("genero")}
            {...register("genero")}
            onIonChange={(e) => setValue("genero", e.detail.value)}
          >
            <IonItem className={"ion-margin-top"}>
              <IonRadio value={"masculino"}>Masculino</IonRadio>
            </IonItem>
            <IonItem>
              <IonRadio value={"feminino"}>Feminino</IonRadio>
            </IonItem>
            <IonItem className={"ion-margin-bottom"}>
              <IonRadio value={"outro"}>Outro</IonRadio>
            </IonItem>
          </IonRadioGroup>
          {errors.genero && (
            <IonText color={"danger"}>{errors.genero.message}</IonText>
          )}
        </IonList>
        <IonItem>
          <IonSelect
            value={getValues("cidade")}
            {...register("cidade")}
            labelPlacement={"floating"}
            interface={"action-sheet"}
            cancelText={"Cancelar"}
          >
            <div slot="label">
              Cidade{" "}
              <IonText color={"danger"} className={"ion-padding"}>
                {errors.cidade?.message}
              </IonText>
            </div>
            <IonSelectOption value={"sao-paulo"}>São Paulo</IonSelectOption>
            <IonSelectOption value={"rio-de-janeiro"}>
              Rio de Janeiro
            </IonSelectOption>
            <IonSelectOption value={"belo-horizonte"}>
              Belo Horizonte
            </IonSelectOption>
            <IonSelectOption value={"outro"}>Outro</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonList className={"ion-padding"}>
          <IonLabel>Interesses</IonLabel>
          <IonItem className={"ion-margin-top"}>
            <IonCheckbox
              checked={getValues("interesses").includes("esportes")}
              onIonChange={() => handleInteresseItem("esportes")}
            >
              Esportes
            </IonCheckbox>
          </IonItem>
          <IonItem>
            <IonCheckbox
              checked={getValues("interesses").includes("musica")}
              onIonChange={() => handleInteresseItem("musica")}
            >
              Música
            </IonCheckbox>
          </IonItem>
          <IonItem>
            <IonCheckbox
              checked={getValues("interesses").includes("leitura")}
              onIonChange={() => handleInteresseItem("leitura")}
            >
              Leitura
            </IonCheckbox>
          </IonItem>
          <IonItem>
            <IonCheckbox
              checked={getValues("interesses").includes("viagens")}
              onIonChange={() => handleInteresseItem("viagens")}
            >
              Viagens
            </IonCheckbox>
          </IonItem>
        </IonList>
        <IonItem>
          <IonToggle
            {...register("alertas")}
            name={"alertas"}
            checked={getValues("alertas")}
            onIonChange={(e) => setValue("alertas", e.detail.checked)}
          >
            <IonLabel>Receber notificações</IonLabel>
          </IonToggle>
        </IonItem>
        <IonButton
          type={"submit"}
          expand={"full"}
          shape={"round"}
          className={"ion-margin"}
        >
          Salvar
          <IonIcon icon={create}></IonIcon>
        </IonButton>
      </IonList>
    </form>
  );
}

export default UserForm;
