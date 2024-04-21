import { Box, Button, Card, CardContent, CardHeader, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addUser, updateUser } from '@/services'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from '@mui/lab'

const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).required()
  })

const RegisterPage = ({createUser, setCreateUser, pageTitle, editUser, getUserList}) => {
    const[loading, setLoading] = useState(false)
    const {
        control,
        setError,
        reset,
        setValue,
        handleSubmit,
        formState: { errors }
        } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    useEffect(()=>{
        if(editUser){
            setValue('username', editUser.username)
            setValue('email', editUser.email)
            setValue('password', editUser.password)
        }
    },[editUser])

    const onSubmit = data => {
        setLoading(true)
        if(pageTitle === 'Create User'){
            addUser(data).then(res => {
                const response = res.data;
                toast.success("User Added");
                resetFormValues()
                setLoading(false)
            })
            .catch((err)=>{setLoading(false)})
        }
        else{
            updateUser(editUser._id,data).then(res => {
                const response = res.data;
                toast.success("User Updated");
                resetFormValues()
                setLoading(false)
            })
            .catch((err)=>{setLoading(false)})
        }
    }

    const goBackFn = () =>{
        setCreateUser(!createUser)
        getUserList()
    }

    const resetFormValues = () =>{
        reset({
            username: "",
            email: "",
            password: ""
        })
    }

  return (
    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
        <Card sx={{width:'500px'}}>
            <CardHeader 
                 title={pageTitle}
                 subheader="Please enter below details"
                 sx={{textAlign:'center'}}
            />
            <CardContent>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                        <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='username'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                            <TextField
                                label='User name'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                error={Boolean(errors.username)}
                                placeholder='Enter your Username'
                            />
                            )}
                        />
                        {errors.username && <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>}
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='email'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                            <TextField
                                label='Email'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                error={Boolean(errors.email)}
                                placeholder='Enter your email'
                            />
                            )}
                        />
                        {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                            Password
                        </InputLabel>
                        <Controller
                            name='password'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                            <OutlinedInput
                                value={value}
                                onBlur={onBlur}
                                label='Password'
                                onChange={onChange}
                                id='auth-login-v2-password'
                                error={Boolean(errors.password)}
                                type="text"
                            />
                            )}
                        />
                        {errors.password && (
                            <FormHelperText sx={{ color: 'error.main' }} id=''>
                            {errors.password.message}
                            </FormHelperText>
                        )}
                        </FormControl>
                        <LoadingButton loading={loading} fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
                            Register
                        </LoadingButton>
                        <Button onClick={()=> goBackFn()} fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
                            Go Back
                        </Button>
                    </form>               
                    </Grid>

                    
                </Grid>
            </CardContent>
        </Card>
        <ToastContainer />
    </Box>
  )
}

export default RegisterPage