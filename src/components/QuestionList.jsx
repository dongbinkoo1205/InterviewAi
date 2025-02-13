// 리액트
import React from 'react';
// 슬라이드
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// mui 컴포넌트
import { Box, Button, Card, CardContent, Typography, Container, Avatar } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// 컨텍스트
import { useQuestionContext } from '../Context/QuestionContext';

// 컴포넌트
import ResultList from './ResultList';
import AnswerInput from './AnswerInput';
import { LoadingScreen } from './CustomAlert';
import JobNews from './JobNews';
import Profile from './Profile';
import InterviewEvaluation from './InterviewEvaluation';
import CustomTultip from './CustomTultip';
import SlideNotification from './SlideNotification';

// 이미지
import bg from '/public/bg2.png';

// css
import './QuestionList.css';

function QuestionList() {
    const { questions, currentQuestionIndex, handleReadQuestion, handleAnswerSubmit, answers, isLoading, job } =
        useQuestionContext();

    const AllClear = answers.length === questions.length;

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        dots: AllClear,
        slidesToScroll: AllClear ? 1 : 0, // 슬라이드 이동 제한 추가
        arrows: AllClear, // 버튼 표시 조건 추가
        draggable: AllClear, // 드래그 이동 제한 추가
        swipe: AllClear, // 스와이프 제한 추가4
        adaptiveHeight: false,
    };

    const messages = questions
        .map((question, index) => {
            const answer = answers[index] || '';
            return [
                { isQuestion: true, profileImage: 'https://via.placeholder.com/48', name: '질문자', message: question },
                answer && {
                    isQuestion: false,
                    profileImage: 'https://via.placeholder.com/48',
                    name: '답변자',
                    message: answer,
                },
            ].filter(Boolean);
        })
        .flat();

    return (
        <Box
            sx={{
                width: '100%',
                height: 'calc(100% - 80px)',
                minHeight: '100vh',
                padding: '40px',
                background: `url(${bg})`,
                backgroundSize: 'cover',
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    zIndex: '1',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '30%',
                        position: 'sticky',
                        top: '40px',
                        height: 'calc(100vh - 80px)',
                    }}
                >
                    <Box sx={{ width: '100%' }}>
                        <JobNews />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Profile />
                    </Box>
                </Box>
                <Box sx={{ width: '68%', height: 'calc(100vh - 80px)' }}>
                    {isLoading ? (
                        <LoadingScreen job={job} />
                    ) : (
                        <Slider {...settings}>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    margin: '0 auto',
                                    padding: 4,
                                    backgroundColor: '#00000059',
                                    boxShadow: 1,
                                    textAlign: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        margin: '0 0 15px',
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            width: '100%',
                                            color: 'white',
                                            fontSize: '12px',
                                            textAlign: 'justify',
                                            color: '#fff',
                                        }}
                                    >
                                        - New Approach to Interviews, Interview AI
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                        }}
                                    >
                                        <CustomTultip
                                            title="키워드를 활용해 답변하면 좋은 점수를 받을 수 있습니다!"
                                            placement="top"
                                        >
                                            <HelpOutlineIcon sx={{ color: '#ccc', mr: '2px' }} />
                                        </CustomTultip>
                                        <CustomTultip title="짧은 대답은 낮은 점수를 유발합니다." placement="top">
                                            <ErrorOutlineIcon sx={{ color: '#c80000' }} />
                                        </CustomTultip>
                                    </Box>
                                </Box>
                                <Box sx={{ textAlign: 'left', color: 'white', margin: '30px 0px' }}>
                                    <Typography variant="h2">
                                        Please answer my
                                        <span style={{ display: 'block', fontWeight: 'bold' }}>
                                            Question-{currentQuestionIndex + 1}
                                        </span>
                                    </Typography>
                                </Box>

                                {questions.length > 0 && currentQuestionIndex < questions.length && (
                                    <Box display="flex" flexDirection="column" alignItems={'flex-start'}>
                                        <Box
                                            display="flex"
                                            alignItems="flex"
                                            sx={{
                                                width: '100%',
                                                justifyContent: 'space-between',
                                                margin: '30px 0 ',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <Card
                                                sx={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    width: 'auto',
                                                    borderRadius: '0',
                                                    backgroundColor: 'transparent',
                                                    boxShadow: 'none',
                                                    width: '100%',
                                                }}
                                            >
                                                {/* <Avatar
                                                    src={robot}
                                                    sx={{ width: 70, height: 70, marginRight: '10px' }}
                                                /> */}
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {/* <MainLogo size="25px" /> */}
                                                </Box>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        width: '100%',
                                                        color: 'white',
                                                        fontSize: '23px',
                                                        textAlign: 'left',
                                                        margin: '0px 0 15px 0 ',
                                                    }}
                                                >
                                                    {questions[currentQuestionIndex]}
                                                </Typography>
                                            </Card>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                sx={{ alignSelf: 'flex-start', alignSelf: 'end', color: 'white' }}
                                                onClick={handleReadQuestion}
                                            >
                                                오디오 듣기
                                            </Button>
                                        </Box>
                                        <AnswerInput onSubmit={handleAnswerSubmit} sx={{ mt: 2 }} />
                                    </Box>
                                )}
                            </Box>
                            <Box>{AllClear && <ResultList questions={questions} answers={answers} />}</Box>
                            <Box>{AllClear && <InterviewEvaluation />}</Box>
                        </Slider>
                    )}
                </Box>
            </Box>
            <Box>{AllClear && <SlideNotification />}</Box>
        </Box>
    );
}

export default QuestionList;
