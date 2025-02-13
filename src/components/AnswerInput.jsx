// src/components/AnswerInput.jsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function AnswerInput({ onSubmit }) {
    const [answer, setAnswer] = useState('');

    const handleSubmit = () => {
        if (answer.trim()) {
            onSubmit(answer);
            setAnswer('');
        }
    };

    return (
        <Box sx={{ mt: '30px', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <TextField
                fullWidth
                label="답변을 입력하세요"
                variant="outlined"
                multiline
                rows={2}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        color: 'white', // 텍스트 색상
                        '& fieldset': {
                            borderColor: 'white', // 기본 테두리 색상
                        },
                        '&:hover fieldset': {
                            borderColor: 'white', // 호버 시 테두리 색상
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white', // 포커스 상태의 테두리 색상
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white', // 라벨 텍스트 색상
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'white', // 포커스 상태의 라벨 색상
                    },
                }}
            />
            <Button variant="contained" color="secondary" sx={{ mt: 2, alignSelf: 'end' }} onClick={handleSubmit}>
                답변제출
            </Button>
        </Box>
    );
}

export default AnswerInput;
