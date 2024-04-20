import { deleteForms, getForm } from '@/services'
import FormGenerator from '@/views/formGenerator'
import ViewForm from '@/views/viewForm'
import { Box, Button, ButtonGroup, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, LinearProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const FormsListing = ({isadmin}) => {
    const[createForm, setCreateForm] = useState(false)
    const [formsList, setFormsList] = useState([])
    const [viewformData, setViewformData] = useState({})
    const [open, setOpen] = useState(false);
    const[formTitle, setFormTitle] = useState('')
    const[formId, setFormId] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        if(createForm === false) getForms()
    },[createForm])

    const handleClickOpen = (data) => {
        setViewformData(data)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const checkCreateForm = (value,formsData) => {
        setViewformData(formsData?.forms)
        setFormId(formsData?._id)
        setFormTitle(value)
        setCreateForm(!createForm)
    }

    const getForms = () => {
        setLoading(true)
        getForm().then(res => {
            const response = res.data;
            console.log('test',response)
            setFormsList(response.message)
            setLoading(false)
        })
        .catch((err)=>{ setLoading(false)})
    }

    const onSubmit = async (data) => {    
        handleClose()
        toast.success(`Form Submitted`);
      };

    const deleteForm = (id) => {
        setLoading(true)
        deleteForms(id).then(res => {
            toast.success("Form Deleted");
            getForms()
        })
        .catch((err)=>{setLoading(false)})
    }
    

  return (
    <>
        {createForm ? 
            <FormGenerator formTitle = {formTitle} createForm={createForm} setCreateForm={setCreateForm} defaultValues = {viewformData} formId={formId} />
        :
            <>
                <Typography variant='h5' sx={{pb:5}}>Forms List</Typography>
                {isadmin == "true" &&
                    <Button variant="contained" sx={{float:'right'}} onClick={() => checkCreateForm('Create Form', null)}>Create Form</Button>
                }
                
                <Grid container spacing={3}>
                {loading ? 
                    <>
                        <Grid item md={2}></Grid>
                        <Grid item md={8}><LinearProgress /></Grid>
                        <Grid item md={2}></Grid>
                    </>
                :
                <>
                    {formsList?.map((data,i)=>{
                        return(
                            <>
                                <Grid item md={2} xs={0}></Grid>
                                    <Grid item xs={12} md={8}>
                                        <Card style={{backgroundColor: "#edebeb"}}>
                                            <CardContent>
                                                <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                                    <Typography>{data?.forms?.formName}</Typography>
                                                    <ButtonGroup variant="contained" aria-label="Basic button group">
                                                        <Button color='secondary' onClick={()=>handleClickOpen(data.forms)}>View</Button>
                                                        {isadmin == "true" &&
                                                            <>
                                                                <Button onClick={() => checkCreateForm('Edit Form', data)}>Edit</Button>
                                                                <Button color='error' onClick={() => deleteForm(data._id)}>Delete</Button>
                                                            </>
                                                        }
                                                    </ButtonGroup>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                <Grid item md={2} xs={0}></Grid>        
                            </>
                        )
                    })}
                </>
                
                
                
                }
                </Grid>

                {/* <ViewForm/> */}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <ViewForm formData={viewformData} handleClose={handleClose} submitForm={onSubmit}/>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                <ToastContainer />
            </>
        }
    </>
  );
};

export default FormsListing;
