// Define types for the form fields
export interface FormField {
    id: number;
    name: string;
    fieldType: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    defaultValue: string | boolean | string[];
    required: boolean;
    listOfValues1?: string[];
  }