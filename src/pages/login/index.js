import { Box, Button, Card, CardContent, CardHeader, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import React from 'react'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getUser } from '@/services'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required()
  })

const LoginPage = () => {
    const {
        control,
        setError,
        handleSubmit,
        formState: { errors }
        } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const router = useRouter()

    const onSubmit = data => {
        getUserList(data)
    }

    const getUserList = (val) => {
        getUser().then(res => {
            const response = res.data.message
            var result = response.filter(obj => {
                return obj.email === val.email
            })
            if(result.length > 0){
                if(val.password === result[0].password){
                    let obj ={
                        username:result[0].username,
                        email:result[0].email,
                        isadmin:result[0].isadmin
                    }
                    localStorage.setItem('userDetails', JSON.stringify(obj))
                    router.push('/dashboard')
                }
                else{
                    toast.error("Login Failed");
                }    
            }
            else if(val.email === 'admin@example.com' && val.password === 'Admin@123'){
                let obj ={
                    username:val.email,
                    email:val.password,
                    isadmin:"true"
                }
                localStorage.setItem('userDetails', JSON.stringify(obj))
                router.push('/dashboard')
            }
            else{
                toast.error("Login Failed");
            }
        })
        .catch((err)=>{ })
    }

  return (
    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
        <Card sx={{width:'500px'}}>
            <CardHeader 
                 title="Login"
                 subheader="Please enter below details"
                 sx={{textAlign:'center'}}
            />
            <CardContent>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                        <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='email'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                            <TextField
                                autoFocus
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
                                type="password"
                            />
                            )}
                        />
                        {errors.password && (
                            <FormHelperText sx={{ color: 'error.main' }} id=''>
                            {errors.password.message}
                            </FormHelperText>
                        )}
                        </FormControl>
                        <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
                            Login 
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

export default LoginPage