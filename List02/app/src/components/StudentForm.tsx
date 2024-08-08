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
  IonText,
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
          className={`${errors.nome ? "ion-invalid ion-touched" : ""}`}
          {...register("nome")}
          label={"Nome"}
          aria-label="Nome"
          type="text"
          name="nome"
          labelPlacement={"floating"}
          errorText={errors.nome?.message}
        />
      </IonItem>
      <IonItem>
        <IonSelect
          aria-label="Sexo"
          value={getValues("sexo")}
          {...register("sexo")}
          labelPlacement={"floating"}
          interface={"action-sheet"}
          cancelText={"Cancelar"}
        >
          <div slot="label">
            Sexo:
            <IonText color="danger" className={"ion-padding"}>
              {errors.sexo?.message}
            </IonText>
          </div>
          <IonSelectOption value={"masculino"}>Masculino</IonSelectOption>
          <IonSelectOption value={"feminino"}>Feminino</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonInput
          className={`${errors.telefone ? "ion-invalid ion-touched" : ""}`}
          {...register("telefone")}
          aria-label="Telefone"
          type={"tel"}
          name="telefone"
          label={"Telefone"}
          errorText={errors.telefone?.message}
          labelPlacement={"floating"}
        />
      </IonItem>
      <IonItem>
        <IonInput
          className={`${errors.matricula ? "ion-invalid ion-touched" : ""}`}
          {...register("matricula")}
          aria-label="Matricula"
          type={"text"}
          label={"Matricula"}
          name={"matricula"}
          labelPlacement={"floating"}
          errorText={errors.matricula?.message}
        />
      </IonItem>
      <IonItem>
        <IonToggle
          checked={getValues("bilingue")}
          name="bilingue"
          onIonChange={(e) => setValue("bilingue", e.detail.checked)}
          aria-label="Bilíngue"
        >
          Bilíngue
        </IonToggle>
      </IonItem>
      <IonList className={"ion-padding"}>
        <IonLabel>Cursos</IonLabel>
        <IonItem className={"ion-margin-top"}>
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
      <IonButton
        type="submit"
        expand={"full"}
        shape={"round"}
        className={"ion-margin-top"}
      >
        Cadastrar
      </IonButton>
    </form>
  );
}

export default StudentForm;
