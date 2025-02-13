import React, { useState } from 'react';
import { Container, Box, Typography, Card, CardContent, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const ResultList = ({ questions, answers }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <Container
            sx={{
                p: '0 !important',
                backgroundColor: '#00000059',
                height: 'calc(100vh - 80px)',
            }}
        >
            <Box
                sx={{
                    padding: '32px 40px',
                }}
            >
                {/* 제목 섹션 */}
                <Box sx={{ textAlign: 'justify', color: 'white' }}>
                    <Typography variant="h2">
                        How did you <span style={{ display: 'block', fontWeight: 'bold' }}>answer?</span>
                    </Typography>
                </Box>

                {/* 질문 섹션 */}
                <Typography variant="body1" sx={{ mt: 3, mb: 3, color: 'white' }}>
                    Frequently asked questions
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {questions.map((question, index) => (
                        <Card
                            key={index}
                            sx={{
                                backgroundColor: '#00000059',
                                color: '#fff',
                                borderRadius: 1,
                                boxShadow: 2,
                            }}
                        >
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleToggle(index)}
                                >
                                    <Typography variant="h6" color="#fff" sx={{}}>
                                        {question}
                                    </Typography>
                                    <IconButton>
                                        {openIndex === index ? (
                                            <ExpandLessIcon sx={{ color: 'White' }} />
                                        ) : (
                                            <ExpandMoreIcon sx={{ color: 'White' }} />
                                        )}
                                    </IconButton>
                                </Box>
                                <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                                    <Typography
                                        variant="body1"
                                        sx={{ m: '10px 0 0', borderTop: '1px solid white', padding: '10px 0 0' }}
                                    >
                                        {answers[index] || '답변이 제공되지 않았습니다.'}
                                    </Typography>
                                </Collapse>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Container>
    );
};

export default ResultList;
