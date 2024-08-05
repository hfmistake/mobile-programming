import React from "react";
import {
  IonButton,
  IonCheckbox,
  IonInput,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonToggle,
} from "@ionic/react";

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
      <IonItem>
        <IonInput
          aria-label={"Nome"}
          {...register("nome")}
          name={"nome"}
          type={"text"}
          placeholder={"Nome"}
        />
        {errors.nome && <span>{errors.nome.message}</span>}
      </IonItem>
      <IonItem>
        <IonInput
          aria-label={"Idade"}
          {...register("idade")}
          name={"idade"}
          type={"text"}
          placeholder={"Idade"}
        />
        {errors.idade && <span>{errors.idade.message}</span>}
      </IonItem>
      <IonItem>
        <IonInput
          aria-label={"Email"}
          {...register("email")}
          name={"email"}
          type={"email"}
          placeholder={"Email"}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </IonItem>
      <IonItem>
        <IonInput
          aria-label={"Telefone"}
          {...register("telefone")}
          name={"telefone"}
          type={"tel"}
          placeholder={"Telefone"}
        />
        {errors.telefone && <span>{errors.telefone.message}</span>}
      </IonItem>
      <IonItem>
        <IonInput
          aria-label={"Endereço"}
          {...register("endereco")}
          name={"endereco"}
          type={"text"}
          placeholder={"Endereço"}
        />
        {errors.endereco && <span>{errors.endereco.message}</span>}
      </IonItem>
      <IonItem>
        <IonLabel>Genero</IonLabel>
        <IonRadioGroup
          value={getValues("genero")}
          {...register("genero")}
          onIonChange={(e) => setValue("genero", e.detail.value)}
        >
          <IonItem>
            <IonRadio value={"masculino"}>Masculino</IonRadio>
          </IonItem>
          <IonItem>
            <IonRadio value={"feminino"}>Feminino</IonRadio>
          </IonItem>
          <IonItem>
            <IonRadio value={"outro"}>Outro</IonRadio>
          </IonItem>
        </IonRadioGroup>
        {errors.genero && <span>{errors.genero.message}</span>}
      </IonItem>
      <IonItem>
        <IonSelect
          value={getValues("cidade")}
          {...register("cidade")}
          placeholder={"Selecione uma cidade"}
        >
          <IonSelectOption value={"sao-paulo"}>São Paulo</IonSelectOption>
          <IonSelectOption value={"rio-de-janeiro"}>
            Rio de Janeiro
          </IonSelectOption>
          <IonSelectOption value={"belo-horizonte"}>
            Belo Horizonte
          </IonSelectOption>
          <IonSelectOption value={"outro"}>Outro</IonSelectOption>
        </IonSelect>
        {errors.cidade && <span>{errors.cidade.message}</span>}
      </IonItem>
      <IonItem>
        <IonLabel>Interesses</IonLabel>
        <IonItem>
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
      </IonItem>
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
      <IonButton type={"submit"}>Salvar</IonButton>
    </form>
  );
}

export default UserForm;
