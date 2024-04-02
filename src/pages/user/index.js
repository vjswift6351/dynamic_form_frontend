import { deleteUser, getUser } from '@/services'
import RegisterPage from '@/views/register'
import { Box, Button, ButtonGroup, Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserListing = () => {
    const[createUser, setCreateUser] = useState(false)
    const[userList, setUserList] = useState([])
    const[editUser, setEditUser] = useState('')
    const[pageTitle, setPageTitle] = useState('')

    useEffect(()=>{
        getUserList()
    },[])

    const checkCreateUser = (title, obj) => {
        setCreateUser(!createUser)
        setEditUser(obj)
        setPageTitle(title)
    }

    const getUserList = () => {
        getUser().then(res => {
            const response = res.data;
            console.log('test',response)
            setUserList(response.message)
        })
        .catch((err)=>{console.log(err)})
    }

    const deleteUserFn = (id) => {
        deleteUser(id).then(res => {
            toast.success("User Deleted");
            getUserList()
        })
        .catch((err)=>{console.log(err)})
    }

  return (
    <>
        {createUser ? 
            <RegisterPage pageTitle ={pageTitle} editUser={editUser} createUser={createUser} setCreateUser={setCreateUser} getUserList={getUserList} />
        :
            <>
                <Typography variant='h5' sx={{pb:5}}>User List</Typography>
                <Button variant="contained" sx={{float:'right'}} onClick={()=>checkCreateUser('Create User', null)}>Create User</Button>
                <Grid container spacing={4}>
                    {userList?.map((data,i)=>{
                        return(
                            <>
                            <Grid item md={2}></Grid>
                                <Grid item md={8}>
                                    <Card style={{backgroundColor: "#edebeb"}}>
                                        <CardContent>
                                            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                                <Typography>{data.username}</Typography>
                                                <ButtonGroup variant="contained" aria-label="Basic button group">
                                                    <Button onClick={()=>checkCreateUser('Edit User', data)}>Edit</Button>
                                                    <Button onClick={()=>deleteUserFn(data._id)}>Delete</Button>
                                                </ButtonGroup>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            <Grid item md={2}></Grid>
                            </>
                        )
                    })}
                    
                </Grid>
                <ToastContainer />
            </>
        }
    </>
  )
}

export default UserListing