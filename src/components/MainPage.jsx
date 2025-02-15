// src/App.jsx
import { Box } from '@mui/material';
import { useQuestionContext } from '../Context/QuestionContext';
import MainInput from './MainInput';
import MainVideo from './MainVideo';

async function fetchRegister(name, email, password) {
    try {
        const response = await fetch('https://interviewai-ij1p.onrender.com/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            throw new Error('회원가입 실패');
        }

        const data = await response.json();
        console.log('✅ 회원가입 성공:', data);
        return data;
    } catch (error) {
        console.error('❌ 회원가입 오류:', error);
        throw error;
    }
}

async function fetchQuestions(job) {
    try {
        const response = await fetch('https://interviewai-ij1p.onrender.com/api/generate-questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ job }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch questions');
        }

        const data = await response.json();
        return data.questions;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
}

function MainPage() {
    const { handleJobSubmit, answers, handleLogin, isLogin } = useQuestionContext();

    const handleSubmit = (job) => {
        handleJobSubmit(fetchQuestions, job);
    };
    const handleLoginSubmit = (name, email, password) => {
        handleLogin(fetchRegister, name, email, password);
    };

    return (
        <Box component="section" sx={{ height: '100vh', padding: '40px', display: 'flex', backgroundColor: 'black' }}>
            <Box
                sx={{
                    backgroundColor: '#191919',
                    width: '100% ',
                    borderRadius: '15px',
                    display: 'flex',
                    overflow: 'hidden',
                    position: 'relative',
                    zIndex: '1',
                }}
            >
                <MainInput onSubmit={handleSubmit} onLogin={handleLoginSubmit} />
                <MainVideo id={2} />
            </Box>
        </Box>
    );
}

export default MainPage;
