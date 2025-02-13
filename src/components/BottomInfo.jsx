import React from 'react';
import { Box, Typography } from '@mui/material';

function BottomInfo() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', position: 'absolute', bottom: '0px', right: '40px' }}>
            <Typography
                variant="span"
                component="span"
                sx={{ color: '#ccc', textAlign: 'center', fontSize: '11px', margin: '10px' }}
            >
                Privacy Policy
            </Typography>
            <Typography
                variant="span"
                component="span"
                sx={{ color: '#ccc', textAlign: 'center', fontSize: '11px', margin: '10px' }}
            >
                Terms of Service
            </Typography>
        </Box>
    );
}

export default BottomInfo;
