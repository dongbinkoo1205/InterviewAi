import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuestionContext } from '../Context/QuestionContext'; // 로그인 상태 관리
import fetchLogin from '../api/fetchLogin'; // 로그인 API

const Login = () => {
    const { handleLogin, setIsLogin } = useQuestionContext(); // Context에서 로그인 함수 가져오기
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // 에러 초기화

        try {
            const { email, password } = formData;
            const data = await fetchLogin(email, password);

            if (!data) {
                setErrorMessage('이메일 또는 비밀번호가 잘못되었습니다.');
                return;
            }
            setIsLogin(true);
            await handleLogin(data);

            navigate('/');
        } catch (error) {
            console.error('❌ 로그인 오류:', error);
            setErrorMessage('로그인 중 오류가 발생했습니다.');
        }
    };

    return (
        <Container component="main" maxWidth="false" disableGutters>
            <Paper
                elevation={3}
                sx={{
                    mt: 4,
                    mb: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    color: 'white',
                }}
            >
                <Typography variant="h6" className="SCDream-r">
                    User Login
                </Typography>

                {errorMessage && (
                    <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                        {errorMessage}
                    </Typography>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
                    <TextField
                        fullWidth
                        label="이메일"
                        type="email"
                        variant="outlined"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        sx={{
                            marginBottom: '15px',
                            input: { color: '#fff' }, // 텍스트 색상 (주황색)
                            textAlign: 'center',
                            '& label': {
                                color: '#fff',
                            }, // 기본 라벨 색상 (파란색)
                            '& label.Mui-focused': { color: '#c54261' }, // 포커스 시 라벨 색상 (초록색)
                            borderRadius: '18px',
                            backgroundColor: '##000000ba', // 입력 필드 배경색 (연한 회색)
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#ccc' }, // 기본 보더 색상 (회색)
                                '&:hover fieldset': { borderColor: '#c54261' }, // 호버 시 보더 색상 (검정색)
                                '&.Mui-focused fieldset': { borderColor: '#c54261' }, // 포커스 시 보더 색상 (빨간색)
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="비밀번호"
                        type="password"
                        variant="outlined"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        sx={{
                            marginBottom: '15px',
                            input: { color: '#fff' }, // 텍스트 색상 (주황색)
                            textAlign: 'center',
                            '& label': {
                                color: '#fff',
                            }, // 기본 라벨 색상 (파란색)
                            '& label.Mui-focused': { color: '#c54261' }, // 포커스 시 라벨 색상 (초록색)
                            borderRadius: '18px',
                            backgroundColor: '##000000ba', // 입력 필드 배경색 (연한 회색)
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#ccc' }, // 기본 보더 색상 (회    색)
                                '&:hover fieldset': { borderColor: '#c54261' }, // 호버 시 보더 색상 (검정색)
                                '&.Mui-focused fieldset': { borderColor: '#c54261' }, // 포커스 시 보더 색상 (빨간색)
                            },
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 2,
                            backgroundImage: 'linear-gradient(90deg, #c54261, #f47555)',
                            color: 'white',
                            py: 1.5,
                            fontSize: '15px',
                        }}
                    >
                        로그인
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
