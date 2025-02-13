import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#6C63FF', // 밝은 보라색
        },
        secondary: {
            main: '#000', // 핑크 계열 포인트 색상
        },
        background: {
            default: '#F7F9FC',
            paper: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: 'Pretendard, Arial, sans-serif',
    },
    shape: {
        borderRadius: 16, // 카드와 버튼의 둥근 모서리
    },
});

export default theme;
