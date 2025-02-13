import React, { useState } from 'react';
// mui 컴포넌트
import { Button, Snackbar, Alert } from '@mui/material';

const SlideNotification = ({}) => {
    const [open, setOpen] = useState(true);

    return (
        <div>
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpen(false)} severity="success" variant="filled">
                    모든 질문을 완료했어요! 슬라이드를 넘겨주세요
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SlideNotification;
