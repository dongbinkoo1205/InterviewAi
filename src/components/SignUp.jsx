import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Link,
    Container,
    Paper,
    Grid,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuestionContext } from '../Context/QuestionContext';
import fetchRegister from '../api/fetchRegister';

// 컴포넌트
import { showAlert } from './CustomAlert';

const SignUp = () => {
    const { handleRegister } = useQuestionContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            await handleRegister(fetchRegister, formData.name, formData.email, formData.password);
            navigate('/');
            console.log(formData);
        } catch (error) {
            setErrorMessage(error.message || '회원가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <Container
            component="main"
            maxWidth="xl"
            disableGutters
            className="gradient_Bg"
            sx={{
                padding: '40px',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: {
                        xl: 'calc(100vh - 80px)',
                        lg: '100%',
                        md: '100%',
                        sm: '100%',
                    },
                    minHeight: '50vh',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    position: 'relative',
                    zIndex: '10',
                    flexDirection: {
                        xl: 'row',
                        lg: 'column',
                        md: 'column',
                        sm: 'column',
                    },
                }}
            >
                {/* 왼쪽 영역: 배경 + 텍스트 */}
                <Grid
                    item
                    xs={6}
                    sx={{
                        width: {
                            xl: '50%',
                            lg: '100%',
                            md: '100%',
                            sm: '100%',
                        },
                        background: 'black',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        textAlign: 'center',
                        padding: '0 50px',
                    }}
                >
                    <Typography variant="h1" fontWeight="bold" sx={{ fontSize: '6.2vw' }}>
                        Welcome
                    </Typography>
                    <Typography variant="h1" fontWeight="bold" sx={{ fontSize: '6.2vw' }}>
                        Interview
                        <Typography
                            variant="span"
                            className="gradient_text"
                            fontWeight="bold"
                            sx={{ fontSize: '6.2vw', marginLeft: '15px' }}
                        >
                            Ai!
                        </Typography>
                    </Typography>
                    {/* <Typography variant="subtitle1" sx={{ mt: 2, opacity: 0.9 }}>
                        Join us and start your journey today.
                    </Typography> */}
                </Grid>

                {/* 오른쪽 영역: 회원가입 폼 */}
                <Grid
                    item
                    xs={6}
                    sx={{
                        width: {
                            xl: '50%',
                            lg: '100%',
                            md: '100%',
                            sm: '100%',
                        },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        p: 5,
                    }}
                >
                    <Typography variant="h5" fontWeight="bold">
                        Sign Up
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3, color: 'gray' }}>
                        Create an account to get started.
                    </Typography>

                    {errorMessage && (
                        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                            {errorMessage}
                        </Typography>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: '400px' }}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />

                        {/* Remember Me 체크박스 */}
                        <FormControlLabel control={<Checkbox />} label="Remember Me" sx={{ mb: 2 }} />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 2,
                                backgroundImage: 'linear-gradient(135deg, #c54261, #f47555)',
                                color: 'white',
                                py: 1.5,
                                fontSize: '16px',
                                borderRadius: '8px',
                            }}
                        >
                            JOIN US
                        </Button>

                        <Typography
                            variant="body2"
                            onClick={() => {
                                showAlert('Warning', '죄송합니다. 현재는 지원하지 않습니다.');
                            }}
                            sx={{ color: '#c54261', fontWeight: 'bold', mt: 2, mb: 2, textAlign: 'center' }}
                        >
                            Forgot Password?
                        </Typography>
                    </Box>
                </Grid>
            </Paper>
        </Container>
    );
};

export default SignUp;
