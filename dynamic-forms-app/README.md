# Dynamic Form in Next.js with TypeScript

This project demonstrates how to create a dynamic form in a Next.js app using TypeScript. The form is generated based on a JSON data structure, where each entry represents a different form field type (e.g., `NUMBER`, `SLIDER`, `SWITCH`, etc.).

## Features

- Dynamic rendering of form fields based on JSON data.
- Supports various field types, including:
  - `TEXT`
  - `LIST`
  - `RADIO`
  - `CHECKBOX`
  - `Password`
  - `TEXTAREA`
  - `DATE`
  - `FILE`
  - `NUMBER`
  - `SLIDER`
  - `SWITCH`
  - `COLOR`
  - `TIME`
  - `URL`
  - `PHONE`

- Form state is managed using React's `useState` hook.
- Field values are updated dynamically as the user interacts with the form.

## Installation

1. **Clone or download the project:**

   ```bash
   git clone <your-repository-url>
   cd <project-directory>
   npm install
   npm run dev
