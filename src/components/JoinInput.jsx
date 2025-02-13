// src/components/JobInput.jsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function JobInput({ onSubmit }) {
    const [job, setJob] = useState('');

    const handleSubmit = () => {
        if (job.trim()) {
            onSubmit(job); // 부모 컴포넌트로 직무 정보 전달
            setJob('');
        }
    };

    return (
        <Box sx={{ mb: 3 }}>
            <TextField
                fullWidth
                label="직무를 입력하세요"
                variant="outlined"
                value={job}
                onChange={(e) => setJob(e.target.value)}
            />
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
                질문 생성
            </Button>
        </Box>
    );
}

export default JobInput;
