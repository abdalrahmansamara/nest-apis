'use client'
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { TextField, RadioGroup, Radio, FormControlLabel, Select, MenuItem, Button, Grid, Typography, FormControl, InputLabel, Checkbox } from "@mui/material";
import { FormField } from '../../interfaces/dynamic-form-fields.interface'

interface DynamicFormProps {
  formJson: {
    data: FormField[]
  };
}

export default function DynamicForm({ formJson }: DynamicFormProps) {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [formFields, setFormFields] = useState<FormField[]>([]);

  useEffect(() => {
    setFormFields(formJson.data);
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("Form Data:", data);
    localStorage.setItem("formData", JSON.stringify(data));
  };

  const renderField = (field: FormField) => {
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
            helperText={errors[field.name]?.message?.toString() || ''}
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
              {field.listOfValues1?.map((value, index) => (
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
              {field.listOfValues1?.map((value, index) => (
                <FormControlLabel key={index} value={value} control={<Radio />} label={value} />
              ))}
            </RadioGroup>
          </FormControl>
        );

      case "CHECKBOX":
        return (
          <FormControl fullWidth margin="normal">
            <Typography>{field.name}</Typography>
            {field.listOfValues1?.map((value, index) => (
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
            helperText={errors[field.name]?.message?.toString() || ''}
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
            helperText={errors[field.name]?.message?.toString() || ''}
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
          <div key={field.id}>
            <label>{field.name}</label>
            <input
              type="number"
              min={field.min}
              max={field.max}
              defaultValue={field.defaultValue as string}
              required={field.required}
            />
          </div>
        );

      case 'SLIDER':
        return (
          <div key={field.id}>
            <label>{field.name}</label>
            <input
              type="range"
              min={field.min}
              max={field.max}
              defaultValue={field.defaultValue as string}
              required={field.required}
            />
          </div>
        );

      case 'SWITCH':
        return (
          <div key={field.id}>
            <label>{field.name}</label>
            <input
              type="checkbox"
              defaultChecked={field.defaultValue as boolean}
              required={field.required}
            />
          </div>
        );

      case 'COLOR':
        return (
          <div key={field.id}>
            <label>{field.name}</label>
            <input
              type="color"
              defaultValue={field.defaultValue as string}
              required={field.required}
            />
          </div>
        );

      case 'TIME':
        return (
          <div key={field.id}>
            <label>{field.name}</label>
            <input
              type="time"
              defaultValue={field.defaultValue as string}
              required={field.required}
            />
          </div>
        );

      case 'URL':
        return (
          <div key={field.id}>
            <label>{field.name}</label>
            <input
              type="url"
              defaultValue={field.defaultValue as string}
              required={field.required}
            />
          </div>
        );

      case 'PHONE':
        return (
          <div key={field.id}>
            <label>{field.name}</label>
            <input
              type="tel"
              defaultValue={field.defaultValue as string}
              required={field.required}
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
