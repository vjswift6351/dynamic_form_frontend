import React from "react";
import { useForm } from "react-hook-form";
import FieldArray from "./fieldArray";
import { Button, Grid, TextField } from "@mui/material";

const defaultValues = {
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
};

const FormGenerator = ({formTitle, createForm, setCreateForm}) => {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    watch,
    errors,
    reset,
    setValue,
  } = useForm({
    defaultValues,
  });
  const onSubmit = (data) => {
    let updateForm = data.formsCollections;
    updateForm.map((data, i) => {
      data.name = data.label.replace(/\s/g, "").toLowerCase();
    });

    let finalForm = {
      ...data,
      formsCollections: updateForm,
    };
    console.log(finalForm, "1234");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{formTitle}</h1>
      <Button variant="contained" sx={{float:'right'}} onClick={()=>setCreateForm(!createForm)}>Go Back</Button>
      {/* <p>
        The following example demonstrate the ability of building nested array
        fields.
      </p> */}
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            size="small"
            label={"Form Name"}
            {...register(`formName`, {
              required: true,
            })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            size="small"
            label={"Form Description"}
            {...register(`formDescription`, {
              required: true,
            })}
          />
        </Grid>
      </Grid>

      <FieldArray
        {...{
          control,
          register,
          defaultValues,
          getValues,
          setValue,
          errors,
          watch,
        }}
      />
      <Grid
        container
        spacing={4}
        sx={{ display: "flex", justifyContent: "center", p: 5 }}
      >
        <Grid item>
          <Button
            color="warning"
            variant="contained"
            onClick={() =>
              reset({
                formName: "",
                formDescription: "",
                formsCollections: [],
              })
            }
          >
            Reset
          </Button>
        </Grid>
        <Grid item>
          <Button color="success" variant="contained" type="submit">
            Save Form
          </Button>
        </Grid>
      </Grid>

      {/* <button type="button" onClick={() => reset(defaultValues)}>
        Reset
      </button>

      <input type="submit" /> */}
    </form>
  );
};

export default FormGenerator;
