import { Box, Button, Card, CardContent, CardHeader, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import React from 'react'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).required()
  })

const RegisterPage = ({createUser, setCreateUser}) => {
    const {
        control,
        setError,
        handleSubmit,
        formState: { errors }
        } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const onSubmit = data => {
        
        console.log(data)
    }

  return (
    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
        <Card sx={{width:'500px'}}>
            <CardHeader 
                 title="Register User"
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
                        <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
                            Register
                        </Button>
                        <Button onClick={()=>setCreateUser(!createUser)} fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
                            Go Back
                        </Button>
                    </form>               
                    </Grid>

                    
                </Grid>
            </CardContent>
        </Card>
    </Box>
  )
}

export default RegisterPage