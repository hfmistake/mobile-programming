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
import React, { useState } from "react";

export const StudentForm: React.FC = () => {
  interface StudentForm {
    name: string;
    sex: string;
    phone: string;
    registration: string;
    bilingual: boolean;
    courses: string[];
  }

  const [Student, setStudent] = useState<StudentForm>({
    name: "",
    sex: "",
    phone: "",
    registration: "",
    bilingual: false,
    courses: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(Student);
    cleanForm();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLIonInputElement>) => {
    setStudent({
      ...Student,
      [event.target.name]: event.target.value,
    });
  };

  const handleToggleChange = (
    event: React.ChangeEvent<HTMLIonToggleElement>,
  ) => {
    setStudent({
      ...Student,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLIonSelectElement>,
  ) => {
    setStudent({
      ...Student,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLIonCheckboxElement>,
  ) => {
    let courses = Student.courses;
    if (event.target.checked) {
      courses.push(event.target.value);
    } else {
      courses = courses.filter((course) => course !== event.target.value);
    }
    setStudent({
      ...Student,
      courses,
    });
  };

  const cleanForm = () => {
    setStudent({
      name: "",
      sex: "",
      phone: "",
      registration: "",
      bilingual: false,
      courses: [],
    });
  };

  return (
    <div className="ion-padding">
      <form onSubmit={handleSubmit}>
        <h1>Cadastro de Estudante</h1>
        <IonInput
          placeholder="Nome"
          required
          name="name"
          onChange={handleInputChange}
          value={Student.name}
        ></IonInput>
        <IonSelect
          placeholder="Sexo"
          onChange={handleSelectChange}
          value={Student.sex}
        >
          <IonSelectOption value="1">Masculino</IonSelectOption>
          <IonSelectOption value="2">Feminino</IonSelectOption>
        </IonSelect>
        <IonInput
          placeholder="Telefone"
          required
          onChange={handleInputChange}
        ></IonInput>
        <IonInput
          placeholder="Matricula"
          required
          onChange={handleInputChange}
        ></IonInput>
        <IonToggle>Bilíngue</IonToggle>
        <IonList>
          Cursos
          <IonItem>
            <IonCheckbox slot="start" />
            <IonLabel>Html</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox slot="start" />
            <IonLabel>PHP</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox slot="start" />
            <IonLabel>C#</IonLabel>
          </IonItem>
        </IonList>
        <IonButton expand="block" type="submit">
          Cadastrar
        </IonButton>
      </form>
    </div>
  );
};
