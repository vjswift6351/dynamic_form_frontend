import FormGenerator from '@/views/formGenerator'
import { Box, Button, ButtonGroup, Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'

const FormsListing = () => {
    const[createForm, setCreateForm] = useState(false)

    const checkCreateForm = () => {
        setCreateForm(!createForm)
    }

  return (
    <>
        {createForm ? 
            <FormGenerator formTitle = {'Create Form'} createForm={createForm} setCreateForm={setCreateForm} />
        :
            <>
                <Typography variant='h5' sx={{pb:5}}>Forms List</Typography>
                <Button variant="contained" sx={{float:'right'}} onClick={checkCreateForm}>Create Form</Button>
                <Grid container spacing={8}>
                    <Grid item md={2}></Grid>
                    <Grid item md={8}>
                        <Card style={{backgroundColor: "#edebeb"}}>
                            <CardContent>
                                <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                    <Typography>Test Form</Typography>
                                    <ButtonGroup variant="contained" aria-label="Basic button group">
                                        <Button>View</Button>
                                        <Button>Edit</Button>
                                        <Button>Delete</Button>
                                    </ButtonGroup>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={2}></Grid>
                </Grid>   
            </>
        }
    </>
  )
}

export default FormsListing