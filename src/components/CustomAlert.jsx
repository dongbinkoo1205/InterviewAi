// CustomAlert.js
import React from 'react';
import Swal from 'sweetalert2';
import { Box, Typography, CircularProgress } from '@mui/material';
import './CustomAlert.css'; // 추가 스타일 임포트
import '../index.css';

const showAlert = (title, text, icon = 'warning', buttonText = 'Continue') => {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: buttonText,
        background: 'linear-gradient(135deg, rgba(29,53,87,0.9), rgba(230,57,70,0.85))',
        color: '#fff',
        customClass: {
            popup: 'custom-popup',
            confirmButton: 'custom-confirm-button',
        },
    });
};

const LoadingScreen = ({ job }) => {
    return (
        <Box
            sx={{
                height: 'auto',
                minHeight: 'calc(100% - 80px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#000',
                color: '#fff',
                padding: 3,
            }}
        >
            <CircularProgress sx={{ color: '#c54261', mb: 3 }} size={80} />
            <Typography variant="h6" sx={{ mb: 1 }}>
                잠시만 기다려 주세요...
            </Typography>
            <Typography variant="body1" textAlign="center" sx={{ fontWeight: 'bold', mb: 2 }}>
                <span>"{job}"</span>에 대한 맞춤형 질문을 생성하고 있습니다.
            </Typography>
        </Box>
    );
};

export { showAlert, LoadingScreen };
