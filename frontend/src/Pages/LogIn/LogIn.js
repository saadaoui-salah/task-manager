import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@material-ui/core/styles";
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import { Login } from '../../api'

const LogIn = () => {
    const [values, setValues] = React.useState({
        amount: '',
        user: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // const [userToken, setUserToken] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsloading] = useState(false)

    const handleFormOnSubmit = async (event) => {
        event.preventDefault();
        const data = { password: values.password, user: values.user }

        setIsloading(true)
        const result = await Login(data)
        if (result.error) {
            setError(result.error)
            setIsloading(false)
        }
        else if (result.token) {
            localStorage.setItem('token', JSON.stringify(result.token[0]))
            setError('')
            setIsloading(false)
        }
    }




    return (
        <Box sx={{
            backgroundColor: '#656570', width: '100%', height: '100%', p: 0, m: 0, display: 'flex',
            justifyContent: 'center', alignItems: 'center'
        }}>

            <Box
                onSubmit={handleFormOnSubmit}
                component="form"
                sx={{ backgroundColor: '#2e2e38', width: { xs: 250, sm: 500 }, height: { xs: 430, sm: 500 }, mx: 'auto', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>

                <Typography sx={{ color: 'white', fontSize: { xs: 21, sm: 40 }, py: 4 }}>
                    TASK MANAGEMENT
                </Typography>


                <Box sx={{ mx: { xs: 0, sm: 8 } }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: { xs: 'start', sm: 'space-between' },
                        alignItems: 'center'
                    }}>
                        <Typography sx={{ color: 'white', fontSize: 20, textAlign: 'left' }}>
                            user
                        </Typography>
                        <TextField
                            onChange={handleChange('user')}
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '5px',
                                width: { xs: 200, sm: 250 },
                            }}
                            required
                            placeholder="user"
                        />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: { xs: 'start', sm: 'space-between' },
                        alignItems: 'center', mt: 2
                    }}>
                        <Typography sx={{ color: 'white', fontSize: 20, }}>
                            Password
                        </Typography>
                        <FormControl>
                            <OutlinedInput
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '5px',
                                    width: { xs: 200, sm: 250 },
                                }}
                                required
                                placeholder="password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Box>

                    <Typography sx={{
                        color: 'white', fontSize: 18, mt: 1, color: '#ff3838',
                        textTransform: 'capitalize'
                    }}>
                        {error}
                    </Typography>



                    <Box sx={{ mt: { xs: 4, sm: 8 } }}>
                        <LoadingButton
                            loading={isLoading}
                            variant="contained"
                            size="large"
                            color="warning"
                            type="submit"
                            sx={{ width: { xs: 200, sm: 300 }, py: 1, fontSize: 18 }}>
                            Sign In
                        </LoadingButton>
                    </Box>
                </Box>
            </Box>
        </Box >
    );
};

export default LogIn;