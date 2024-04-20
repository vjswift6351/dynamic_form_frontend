import { getForm } from "@/services";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  Select,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ViewForm = ({formData, handleClose, submitForm}) => {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const onSubmit = async (data) => {
    submitForm()
  };

  const values = getValues();



  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5">{formData?.formName}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="p">{formData?.formDescription}</Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {formData?.formsCollections?.map((data, i) => {
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
              <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Button sx={{marginRight:'10px'}} onClick={handleClose} color="error" variant="contained" type="submit">
                  Close
                </Button>
                <Button color="success" variant="contained" type="submit">
                  Save Form
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default ViewForm;
