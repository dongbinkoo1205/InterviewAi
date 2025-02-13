import React, { useState } from 'react';
import { Radar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Box, Typography } from '@mui/material';

import { useQuestionContext } from '../Context/QuestionContext';
import fetchResult from '../api/fetchResult';

const InterviewEvaluation = () => {
    const { answers, questions } = useQuestionContext();
    const [click, setClick] = useState(false);
    const handleOnClick = () => {
        setClick(true);
    };

    const [scores, setScores] = useState({});

    const handleSubmit = async () => {
        const fetchedScores = await fetchResult(answers, questions);
        if (fetchedScores) {
            setScores(fetchedScores);
        }
    };

    const LABELS = ['논리력', '명료함', '전문의식', '자신감', '설득력', '문법'];

    const COLORS = [
        { bg: 'rgba(54, 162, 235, 0.2)', border: 'rgb(0, 153, 255)' }, // 파란색
        { bg: 'rgba(255, 99, 132, 0.2)', border: 'rgb(255, 0, 55)' }, // 빨간색
        { bg: 'rgba(75, 192, 192, 0.2)', border: 'rgb(0, 255, 255)' }, // 녹색
        { bg: 'rgba(255, 206, 86, 0.2)', border: 'rgb(255, 183, 0)' }, // 노란색
        { bg: 'rgba(153, 102, 255, 0.2)', border: 'rgb(85, 0, 255)' }, // 보라색
        { bg: 'rgba(255, 159, 64, 0.2)', border: 'rgba(255, 159, 64, 1)' }, // 주황색
    ];

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)', // 배경 그리드 선을 연한 흰색으로 변경
                },
                angleLines: {
                    color: 'rgba(255, 255, 255, 0.5)', // 중심에서 퍼지는 선을 연한 흰색으로 변경
                },
                pointLabels: {
                    color: '#fff', // 라벨을 골드색으로 변경
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
        },
    };

    const chartData = {
        labels: LABELS,
        datasets: questions.map((question, index) => {
            const color = COLORS[index % COLORS.length]; // 색상 반복 적용
            return {
                label: `질문 ${index + 1}`,
                data: scores[question] ? Object.values(scores[question]) : new Array(LABELS.length).fill(0),
                backgroundColor: color.bg,
                borderColor: color.border,
                borderWidth: 2,
            };
        }),
    };

    return (
        <Box
            sx={{
                backgroundColor: '#00000059',
                height: 'calc(100vh - 80px)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                padding: '32px',
            }}
        >
            {/* 제목 섹션 */}
            <Box sx={{ textAlign: 'justify', color: 'white' }}>
                <Typography variant="h2">
                    Check evaluation <span style={{ display: 'block', fontWeight: 'bold' }}>results</span>
                </Typography>
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: '#030303e3',
                    color: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2vw',
                    display: click ? 'none' : 'flex',
                }}
                onClick={() => {
                    handleSubmit();
                    handleOnClick();
                }}
            >
                클릭하여 점수확인하기
            </Box>

            <Box sx={{ flexGrow: 1, height: 'auto' }}>
                {/* 차트를 부모 높이에 맞게 확장 */}
                <Radar data={chartData} options={options} />
            </Box>
        </Box>
    );
};

export default InterviewEvaluation;
