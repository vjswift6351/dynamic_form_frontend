import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useFieldArray } from "react-hook-form";

const NestedArray = ({ nestIndex, control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `formsCollections.${nestIndex}.options`,
  });

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="p">Options</Typography>
        <Button
          color="primary"
          variant="contained"
          onClick={() =>
            append({
              value: "",
              label: "",
            })
          }
        >
          Add option
        </Button>
      </Box>
      {fields.map((item, k) => {
        return (
          <div key={item.id} style={{ marginLeft: 20, marginBottom: 10 }}>
            <TextField
              size="small"
              label={"Value"}
              {...register(`formsCollections.${nestIndex}.options.${k}.value`, {
                required: true,
              })}
            />
            <TextField
              sx={{ marginLeft: "10px" }}
              size="small"
              label={"Label"}
              {...register(`formsCollections.${nestIndex}.options.${k}.label`, {
                required: true,
              })}
            />
            <Button
              sx={{ marginLeft: "10px" }}
              color="error"
              variant="contained"
              onClick={() => remove(k)}
            >
              Delete Option
            </Button>
          </div>
        );
      })}
    </>
  );
};

export default NestedArray
