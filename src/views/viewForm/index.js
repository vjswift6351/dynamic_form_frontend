import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
const FormGenerator = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [formData, setFormData] = useState({
    formsCollections: [
      {
        headingName: "Text Field",
        type: "text",
        label: "Student Name",
        name: "studentname",
        regex: null,
        defaultValue: "",
        placeholder: null,
        errorMessage: "Student Name is required",
        disabled: "",
        required: true,
        visible: "",
        row: false,
        options: [],
      },
      {
        headingName: "Number Field",
        type: "number",
        label: "Age",
        name: "age",
        regex: null,
        defaultValue: "",
        placeholder: null,
        errorMessage: "Age is required",
        disabled: "",
        required: true,
        visible: "",
        row: false,
        options: [],
      },
      {
        headingName: "Select Field",
        type: "select",
        label: "Gender",
        name: "gender",
        regex: null,
        defaultValue: "",
        placeholder: null,
        errorMessage: "Gender is required",
        disabled: "",
        required: true,
        visible: "",
        row: false,
        options: [
          {
            value: "male",
            label: "Male",
          },
          {
            value: "female",
            label: "Female",
          },
          {
            value: "others",
            label: "others",
          },
        ],
      },
      {
        headingName: "Email Field",
        type: "email",
        label: "Student Email",
        name: "studentemail",
        regex: null,
        defaultValue: "",
        placeholder: null,
        errorMessage: "Email is required",
        disabled: "",
        required: true,
        visible: "",
        row: false,
        options: [],
      },
    ],
    formName: "ID Card Form",
    formDescription: "Please Fill out all the required fields",
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  const values = getValues();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5">{formData.formName}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="p">{formData.formDescription}</Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {formData.formsCollections.map((data, i) => {
              return (
                <>
                  {data.type == "select" ? (
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          {data.label}
                        </InputLabel>
                        <Select
                          label={data.label}
                          value={values.name}
                          onChange={(e) =>
                            setValue(data.name, e.target.value, true)
                          }
                        >
                          {data.options.map((option, i) => {
                            return (
                              <MenuItem key={i} value={option.value}>
                                {option.label}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                  ) : (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type={data.type}
                        label={data.label}
                        {...register(data.name, {
                          required: data.required,
                        })}
                      />
                    </Grid>
                  )}
                </>
              );
            })}
            <Grid item xs={12}>
              <Button color="success" variant="contained" type="submit">
                Save Form
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default FormGenerator;
