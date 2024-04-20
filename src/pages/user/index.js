import { deleteUser, getUser } from '@/services'
import RegisterPage from '@/views/register'
import { Box, Button, ButtonGroup, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserListing = () => {
    const[createUser, setCreateUser] = useState(false)
    const[userList, setUserList] = useState([])
    const[editUser, setEditUser] = useState('')
    const[pageTitle, setPageTitle] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        getUserList()
    },[])

    const checkCreateUser = (title, obj) => {
        setCreateUser(!createUser)
        setEditUser(obj)
        setPageTitle(title)
    }

    const getUserList = () => {
        setLoading(true)
        getUser().then(res => {
            const response = res.data;
            setUserList(response.message)
            setLoading(false)
        })
        .catch((err)=>{ setLoading(false)})
    }

    const deleteUserFn = (id) => {
        setLoading(true)
        deleteUser(id).then(res => {
            toast.success("User Deleted");
            getUserList()
        })
        .catch((err)=>{ setLoading(false)})
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
                {loading ? 
                    <>
                        <Grid item md={2}></Grid>
                        <Grid item md={8}><LinearProgress /></Grid>
                        <Grid item md={2}></Grid>
                    </>
                    :
                    <>
                        {userList?.map((data,i)=>{
                            return(
                                <>
                                <Grid item md={2} xs={0}></Grid>
                                    <Grid item md={8} xs={12}>
                                        <Card style={{backgroundColor: "#edebeb"}}>
                                            <CardContent>
                                                <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                                    <Typography>{data.username}</Typography>
                                                    <ButtonGroup variant="contained" aria-label="Basic button group">
                                                        <Button onClick={()=>checkCreateUser('Edit User', data)}>Edit</Button>
                                                        <Button color='error' onClick={()=>deleteUserFn(data._id)}>Delete</Button>
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
                <ToastContainer />
            </>
        }
    </>
  )
}

export default UserListing