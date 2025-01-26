'use client'
import DynamicForm from './components/shared/dynamic-form.component'
import { FormField } from './interfaces/dynamic-form-fields.interface';

const formJson: {
  data: FormField[]
} = {
  data: [
    {
      id: 1,
      name: "Full Name",
      fieldType: "TEXT",
      minLength: 1,
      maxLength: 100,
      defaultValue: "John Doe",
      required: true,
    },
    {
      id: 2,
      name: "Email",
      fieldType: "TEXT",
      minLength: 1,
      maxLength: 50,
      defaultValue: "hello@mail.com",
      required: true,
    },
    {
      id: 6,
      name: "Gender",
      fieldType: "LIST",
      defaultValue: "1",
      required: true,
      listOfValues1: ["Male", "Female", "Others"],
    },
    {
      id: 7,
      name: "Love React?",
      fieldType: "RADIO",
      defaultValue: "1",
      required: true,
      listOfValues1: ["Yes", "No"],
    },
    {
      id: 8,
      name: "Hobbies",
      fieldType: "CHECKBOX",
      defaultValue: [],
      required: false,
      listOfValues1: ["Reading", "Traveling", "Gaming"],
    },
    {
      id: 9,
      name: "Password",
      fieldType: "PASSWORD",
      minLength: 8,
      maxLength: 50,
      defaultValue: "",
      required: true,
    },
    {
      id: 10,
      name: "Additional Comments",
      fieldType: "TEXTAREA",
      minLength: 0,
      maxLength: 500,
      defaultValue: "",
      required: false,
    }
  ],
};

export default function Home() {
  return (
    <DynamicForm formJson={formJson} />
  );
}
