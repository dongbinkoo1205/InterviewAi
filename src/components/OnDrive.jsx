import React from 'react';
import { Divider, Typography, Box } from '@mui/material';

function OrDivider() {
    return (
        <Box
            className="Pretendard-r"
            sx={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', mt: 5, mb: 5 }}
        >
            <Divider sx={{ flexGrow: 1, borderColor: '#cccccc91' }} />
            <Typography
                variant="body1"
                sx={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#0b0f18',
                    border: '1px solid #cccccc91',
                    color: '#fff',
                    padding: '6px',
                    borderRadius: '50%',
                    fontSize: '14PX',
                }}
            >
                OR
            </Typography>
        </Box>
    );
}

export default OrDivider;
