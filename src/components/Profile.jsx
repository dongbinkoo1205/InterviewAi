import React from 'react';
import { Avatar, Box, Typography, IconButton } from '@mui/material';
// 컴포넌트
import { useQuestionContext } from '../Context/QuestionContext';

function Profile() {
    const { user } = useQuestionContext();

    console.log(user);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                borderRadius: '12px',
                boxShadow: 3,
                position: 'relative',
                backgroundColor: '#00000059',
                color: 'white',
            }}
        >
            {/* 프로필 이미지 */}
            <Avatar
                src="/public/bgRobot2.png" // 📌 여기에 이미지 URL 삽입
                sx={{
                    width: 120,
                    height: 120,
                    margin: 2,
                }}
            />
            {/* 이름 */}
            <Typography variant="h6" fontWeight="bold">
                {user.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray', margin: 1 }}>
                <span style={{ color: 'white', fontWeight: 'bold' }}>{user.email}</span>
            </Typography>
        </Box>
    );
}

export default Profile;
