import React, { useState } from 'react';
// 이미지들
import MainLogo from './MainLogo';
import GoogleBtn from '/public/GoogleBtn.png';
import AppBtn from '/public/AppBtn.png';

// Mui
import { TextField, Button, Box, ImageList, ImageListItem, Typography } from '@mui/material';

// 컨텍스트
import { useNavigateContext } from '../Context/NavigateContext';
import { useQuestionContext } from '../Context/QuestionContext';

// 컴포넌트
import { showAlert } from './CustomAlert';
import OrDivider from './OnDrive';
import PopUp from './PopUp';
import BottomInfo from './BottomInfo';
import Login from './Login';

// css
import './MainInput.css';

function MainInput({ onSubmit }) {
    // 직무 가져오기
    const { job, setJob, validateJobInput, isLogin, user } = useQuestionContext();

    // 팝업
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);

    // 구글 및 앱스토어 버튼
    const [mobBtn, setMobBtn] = useState([GoogleBtn, AppBtn]);

    const handleSubmit = () => {
        // 조건이 모두 통과한 경우에만 실행
        onSubmit(job);
    };

    // 네비게이션
    const { navigate } = useNavigateContext();
    const handleNavigate = (url) => {
        navigate(url);
    };

    return (
        <Box className="MainInput SCDream-r scrollBar" sx={{}}>
            {/* 메인로고 및 Desc*/}
            <Box>
                <Box className="Pretendard-r" sx={{ color: 'white', textAlign: 'center' }}>
                    면접의 새로운 접근 인터뷰 Ai
                </Box>
                <MainLogo size={'4vw'} />
            </Box>
            {/* 직무입력 필드 & 앱버튼 */}
            <Box>
                {/* 직무 입력 필드 */}
                <Box>
                    {isLogin && (
                        <Box
                            sx={{
                                mt: 4,
                                mb: 4,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <Box
                                className="Pretendard-r"
                                sx={{
                                    color: '#ccc',
                                    fontSize: '14px',
                                }}
                            >
                                {`반갑습니다. ${user.name}님 직무를 입력해주세요.`}
                            </Box>
                            <TextField
                                fullWidth
                                label="직무 또는 포지션 입력"
                                variant="outlined"
                                color="#fff"
                                sx={{
                                    margin: '30px 0 15px',
                                    '& .MuiInputBase-input': { color: '#fff', textAlign: 'center' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#282c42', // 기본 테두리 색상
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#ccc', // 호버 시 테두리 색상
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#ccc', // 라벨 색상
                                        left: '50%', // ✅ 중앙 정렬
                                        top: '50%',
                                        transform: 'translate(-50% ,-50%)', // ✅ 정확히 가운데 배치
                                        textAlign: 'center',
                                        fontSize: '16px',
                                    },
                                    '& .MuiInputLabel-shrink': {
                                        left: '50%',
                                        transform: 'translateX(-50%) translateY(-170%)', // ✅ 위로 자연스럽게 이동
                                    },
                                    '& .MuiOutlinedInput-notchedOutline legend': {
                                        textAlign: 'center', // ✅ `legend` 중앙 정렬
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                    },
                                }}
                                value={job}
                                onChange={(e) => setJob(e.target.value)}
                            ></TextField>
                            <Button
                                variant="contained"
                                color="secondary"
                                className="SCDream-r"
                                sx={{
                                    mt: 2,
                                    width: '100%',
                                    color: '#fff',
                                    background: job ? 'linear-gradient(90deg, #c54261, #f47555)' : '#777',
                                    padding: '6px 0',
                                    fontSize: '17px',
                                }}
                                onClick={() => {
                                    if (job === '') {
                                        showAlert('Warning', '직무를 입력해주세요.');
                                    } else if (!validateJobInput(job)) {
                                        showAlert('Warning', '올바른 직무를 입력해주세요.');
                                    } else {
                                        handleNavigate('/QuestionList');
                                        handleSubmit();
                                    }
                                }}
                            >
                                Continue
                            </Button>
                        </Box>
                    )}
                    {/* 로그인창 */}
                    {!isLogin && <Login />}

                    {/* 팝업버튼 */}

                    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Box
                            className="Pretendard-r"
                            sx={{
                                margin: ' 15px 0 5px ',
                                color: '#ccc',
                                fontSize: '14px',
                                textAlign: 'center',
                                width: '100%',
                            }}
                        >
                            {!isLogin ? `아직 회원이 아니신가요? ` : null}
                        </Box>
                        <Typography
                            sx={{
                                textAlign: 'right',
                                display: 'inline',
                                color: '#c54261',
                                fontSize: '14px',
                                marginRight: '10px',
                                cursor: 'pointer',
                            }}
                            className="Pretendard-r"
                            onClick={() => {
                                handleNavigate('/SignUp');
                            }}
                        >
                            Sign-Up
                        </Typography>
                        <Typography
                            sx={{
                                textAlign: 'right',
                                display: 'inline',
                                color: '#c54261',
                                fontSize: '14px',
                                cursor: 'pointer',
                            }}
                            className="Pretendard-r"
                            variant="a"
                            onClick={handleClickOpen}
                        >
                            Need Help?
                        </Typography>
                    </Box>
                    {open && <PopUp setOpen={setOpen} open={open} />}
                </Box>

                {/* 구글플레이 및 앱스토어  */}
                <Box>
                    <OrDivider />
                    <Typography
                        variant="p"
                        component="p"
                        sx={{ color: 'white', textAlign: 'center', fontSize: '15px' }}
                    >
                        Available now on iOS and Android
                    </Typography>
                    <ImageList
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '20px 0',
                        }}
                        className="BtnWrap"
                    >
                        {mobBtn.map((item, index) => (
                            <ImageListItem
                                key={index}
                                sx={{
                                    width: '42%',
                                    margin: '5px',
                                    boxSizing: 'border-box', // 패딩과 테두리를 함께 계산
                                    overflow: 'hidden', // 둥근 모서리를 유지하기 위해 필요
                                    '& > div': {
                                        borderRadius: '6px',
                                        background: 'white', // 내부 콘텐츠 배경색
                                    },
                                }}
                            >
                                <img src={item} alt={`Button ${index + 1}`} loading="lazy" />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>
            </Box>
            <BottomInfo />
        </Box>
    );
}

export default MainInput;
