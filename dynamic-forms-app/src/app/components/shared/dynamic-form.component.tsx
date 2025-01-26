'use client'
import React from "react";
import { useForm } from "react-hook-form";
import { TextField, RadioGroup, Radio, FormControlLabel, Select, MenuItem, Button, Grid, Typography, FormControl, InputLabel, Checkbox } from "@mui/material";
import { useState, useEffect } from "react";

const formJson = {
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

export default function DynamicForm() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
      setFormFields(formJson.data);
  }, []);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    localStorage.setItem("formData", JSON.stringify(data));
  };

  const renderField = (field) => {
    switch (field.fieldType) {
      case "TEXT":
        return (
          <TextField
            {...register(field.name, {
              required: field.required ? `${field.name} is required` : false,
              minLength: field.minLength,
              maxLength: field.maxLength,
            })}
            label={field.name}
            defaultValue={field.defaultValue}
            fullWidth
            margin="normal"
            error={!!errors[field.name]}
            helperText={errors[field.name]?.message}
          />
        );

      case "LIST":
        return (
          <FormControl fullWidth margin="normal">
            <InputLabel>{field.name}</InputLabel>
            <Select
              {...register(field.name, { required: field.required ? `${field.name} is required` : false })}
              defaultValue={field.defaultValue}
            >
              {field.listOfValues1.map((value, index) => (
                <MenuItem key={index} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case "RADIO":
        return (
          <FormControl fullWidth margin="normal">
            <Typography>{field.name}</Typography>
            <RadioGroup defaultValue={field.defaultValue} {...register(field.name, { required: field.required })}>
              {field.listOfValues1.map((value, index) => (
                <FormControlLabel key={index} value={value} control={<Radio />} label={value} />
              ))}
            </RadioGroup>
          </FormControl>
        );

      case "CHECKBOX":
        return (
          <FormControl fullWidth margin="normal">
            <Typography>{field.name}</Typography>
            {field.listOfValues1.map((value, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox {...register(`${field.name}[${index}]`)} />}
                label={value}
              />
            ))}
          </FormControl>
        );

      case "PASSWORD":
        return (
          <TextField
            type="password"
            {...register(field.name, {
              required: field.required ? `${field.name} is required` : false,
              minLength: field.minLength,
              maxLength: field.maxLength,
            })}
            label={field.name}
            defaultValue={field.defaultValue}
            fullWidth
            margin="normal"
            error={!!errors[field.name]}
            helperText={errors[field.name]?.message}
          />
        );

      case "TEXTAREA":
        return (
          <TextField
            multiline
            rows={4}
            {...register(field.name, {
              required: field.required ? `${field.name} is required` : false,
              minLength: field.minLength,
              maxLength: field.maxLength,
            })}
            label={field.name}
            defaultValue={field.defaultValue}
            fullWidth
            margin="normal"
            error={!!errors[field.name]}
            helperText={errors[field.name]?.message}
          />
        );
      case "DATE":
        return (
          <TextField
            type="date"
            {...register(field.name, { required: field.required ? `${field.name} is required` : false })}
            label={field.name}
            defaultValue={field.defaultValue}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        );

      case "FILE":
        return (
          <TextField
            type="file"
            {...register(field.name, { required: field.required ? `${field.name} is required` : false })}
            label={field.name}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        );
case 'NUMBER':
        return (
          <div key={id}>
            <label>{name}</label>
            <input
              type="number"
              min={min}
              max={max}
              value={formValues[name] || defaultValue}
              onChange={(e) => handleChange(name, e.target.value)}
              required={required}
            />
          </div>
        );
      case 'SLIDER':
        return (
          <div key={id}>
            <label>{name}</label>
            <input
              type="range"
              min={min}
              max={max}
              value={formValues[name] || defaultValue}
              onChange={(e) => handleChange(name, e.target.value)}
              required={required}
            />
          </div>
        );
      case 'SWITCH':
        return (
          <div key={id}>
            <label>{name}</label>
            <input
              type="checkbox"
              checked={formValues[name] || defaultValue}
              onChange={(e) => handleChange(name, e.target.checked)}
              required={required}
            />
          </div>
        );
      case 'COLOR':
        return (
          <div key={id}>
            <label>{name}</label>
            <input
              type="color"
              value={formValues[name] || defaultValue}
              onChange={(e) => handleChange(name, e.target.value)}
              required={required}
            />
          </div>
        );
      case 'TIME':
        return (
          <div key={id}>
            <label>{name}</label>
            <input
              type="time"
              value={formValues[name] || defaultValue}
              onChange={(e) => handleChange(name, e.target.value)}
              required={required}
            />
          </div>
        );
      case 'URL':
        return (
          <div key={id}>
            <label>{name}</label>
            <input
              type="url"
              value={formValues[name] || defaultValue}
              onChange={(e) => handleChange(name, e.target.value)}
              required={required}
            />
          </div>
        );
      case 'PHONE':
        return (
          <div key={id}>
            <label>{name}</label>
            <input
              type="tel"
              value={formValues[name] || defaultValue}
              onChange={(e) => handleChange(name, e.target.value)}
              required={required}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh", padding: 16 }}>
      <Grid item xs={12} sm={8} md={6}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" gutterBottom>
            Dynamic Form
          </Typography>
          {formFields.map((field) => (
            <div key={field.id}>{renderField(field)}</div>
          ))}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}
