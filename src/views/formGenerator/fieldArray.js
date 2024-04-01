import React, { useEffect } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import NestedArray from "./nestedFieldArray";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

let renderCount = 0;

const Fields = ({
  control,
  register,
  watch,
  setValue,
  getValues,
}) => {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "formsCollections",
  });

  renderCount++;

  const checkFieldType = (headingName, type) => {
    let fieldStructure = {
      headingName: headingName,
      type: type,
      label: "",
      name: "",
      regex: null,
      defaultValue: "",
      placeholder: null,
      errorMessage: "",
      disabled: "",
      required: "",
      visible: "",
      row: false,
      options: [],
    };
    return fieldStructure;
  };

  //   const watchFieldArray = watch("formsCollections");
  //   const controlledFields = fields.map((field, index) => {
  //     console.log(field, "watch", watchFieldArray);
  //     return {
  //       ...field,
  //       ...watchFieldArray[field.label],
  //     };
  //   });

  //   useEffect(() => {
  //     // console.log("test", controlledFields);
  //   }, [controlledFields]);
  return (
    <Box>
      {fields.map((item, index) => {
        return (
          <Box key={index} sx={{ margin: "10px" }}>
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
              {item.headingName}
            </Typography>
            <Grid
              container
              key={item.id}
              spacing={5}
              sx={{ marginBottom: "20px" }}
            >
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  size="small"
                  label={"Label"}
                  {...register(`formsCollections.${index}.label`, {
                    required: true,
                  })}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  size="small"
                  label={"Default Value"}
                  {...register(`formsCollections.${index}.defaultValue`, {})}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  size="small"
                  label={"Error Message"}
                  {...register(`formsCollections.${index}.errorMessage`, {
                    // required: true,
                  })}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  size="small"
                  label={"Regex"}
                  {...register(`formsCollections.${index}.regex`, {
                    // required: true,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={item.disabled}
                      {...register(`formsCollections.${index}.disabled`)}
                    />
                  }
                  label="Disabled"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={item.required}
                      {...register(`formsCollections.${index}.required`)}
                    />
                  }
                  label="Required"
                />
              </Grid>
              {item.type == "select" && (
                <Grid item xs={12}>
                  <NestedArray nestIndex={index} {...{ control, register }} />
                </Grid>
              )}

              <Grid item xs={12} textAlign={"center"}>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => remove(index)}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
            <Divider sx={{ height: 0 }} color="black"></Divider>
          </Box>
        );
      })}
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "center", p: 5 }}
      >
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              append(checkFieldType("Text Field", "text"));
            }}
          >
            Add Text Field
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              append(checkFieldType("Number Field", "number"));
            }}
          >
            Add Number Field
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              append(checkFieldType("Email Field", "email"));
            }}
          >
            Add Email Field
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              append(checkFieldType("Select Field", "select"));
            }}
          >
            Add Select Field
          </Button>
        </Grid>
        {/* <button
          type="button"
          onClick={() => {
            setValue("formsCollections", [
              ...(getValues().formsCollections || []),
              {
                name: "append",
                nestedArray: [{ field1: "append", field2: "append" }],
              },
            ]);
          }}
        >
          Append Nested
        </button>

        <button
          type="button"
          onClick={() => {
            prepend({ name: "append" });
          }}
        >
          prepend
        </button>

        <button
          type="button"
          onClick={() => {
            setValue("formsCollections", [
              {
                name: "append",
                nestedArray: [{ field1: "Prepend", field2: "Prepend" }],
              },
              ...(getValues().formsCollections || []),
            ]);
          }}
        >
          prepend Nested
        </button> */}
      </Grid>

      {/* <span className="counter">Render Count: {renderCount}</span> */}
    </Box>
  );
}

export default Fields