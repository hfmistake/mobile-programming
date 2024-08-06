import {
  IonButton,
  IonCheckbox,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonItem,
  IonList,
  IonLabel,
} from "@ionic/react";
import React from "react";

function StudentForm({
  register,
  errors,
  setValue,
  getValues,
  handleSubmit,
  onSubmit,
  onError,
  handleCursosItem,
}: any) {
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <IonItem>
        <IonInput
          {...register("nome")}
          placeholder="Nome"
          aria-label="Nome"
          type="text"
          name="nome"
        />
        {errors.nome && (
          <span className={"ion-color-danger"}>{errors.nome.message}</span>
        )}
      </IonItem>
      <IonItem>
        <IonLabel>Sexo:</IonLabel>
        <IonSelect
          aria-label="Sexo"
          value={getValues("sexo")}
          {...register("sexo")}
          placeholder={"Selecione o sexo"}
          labelPlacement={"end"}
        >
          <IonSelectOption value={"masculino"}>Masculino</IonSelectOption>
          <IonSelectOption value={"feminino"}>Feminino</IonSelectOption>
        </IonSelect>
        {errors.sexo && (
          <span className={"ion-color-danger"}>{errors.sexo.message}</span>
        )}
      </IonItem>
      <IonItem>
        <IonInput
          {...register("telefone")}
          placeholder="Telefone"
          aria-label="Telefone"
          type={"tel"}
          name="telefone"
        />
        {errors.telefone && (
          <span className={"ion-color-danger"}>{errors.telefone.message}</span>
        )}
      </IonItem>
      <IonItem>
        <IonInput
          {...register("matricula")}
          placeholder="Matricula"
          aria-label="Matricula"
          type={"text"}
          name={"matricula"}
        />
        {errors.matricula && (
          <span className={"ion-color-danger"}>{errors.matricula.message}</span>
        )}
      </IonItem>
      <IonItem>
        <IonLabel>Bilingue</IonLabel>
        <IonToggle
          {...register("bilingue")}
          checked={getValues("bilingue")}
          name="bilingue"
          onIonChange={(e) => setValue("bilingue", e.detail.checked)}
          aria-label="Bilíngue"
        />
      </IonItem>
      <IonList>
        <IonLabel>Cursos</IonLabel>
        <IonItem>
          <IonCheckbox
            checked={getValues("cursos").includes("html")}
            onIonChange={() => handleCursosItem("html")}
          >
            HTML
          </IonCheckbox>
        </IonItem>
        <IonItem>
          <IonCheckbox
            checked={getValues("cursos").includes("php")}
            onIonChange={() => handleCursosItem("php")}
          >
            PHP
          </IonCheckbox>
        </IonItem>
        <IonItem>
          <IonCheckbox
            checked={getValues("cursos").includes("c#")}
            onIonChange={() => handleCursosItem("c#")}
          >
            C#
          </IonCheckbox>
        </IonItem>
      </IonList>
      <IonItem>
        <IonButton type="submit" expand={"full"} shape={"round"}>
          Cadastrar
        </IonButton>
      </IonItem>
    </form>
  );
}

export default StudentForm;
