import RegisterPage from '@/views/register'
import { Box, Button, ButtonGroup, Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'

const UserListing = () => {
    const[createUser, setCreateUser] = useState(false)

    const checkCreateUser = () => {
        setCreateUser(!createUser)
    }

  return (
    <>
        {createUser ? 
            <RegisterPage createUser={createUser} setCreateUser={setCreateUser} />
        :
            <>
                <Typography variant='h5' sx={{pb:5}}>User List</Typography>
                <Button variant="contained" sx={{float:'right'}} onClick={checkCreateUser}>Create User</Button>
                <Grid container spacing={8}>
                    <Grid item md={2}></Grid>
                    <Grid item md={8}>
                        <Card style={{backgroundColor: "#edebeb"}}>
                            <CardContent>
                                <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                    <Typography>Abc user</Typography>
                                    <ButtonGroup variant="contained" aria-label="Basic button group">
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

export default UserListing