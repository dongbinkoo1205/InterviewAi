import { useEffect, useState } from 'react';
// 컨텍스트
import { useQuestionContext } from '../Context/QuestionContext';
// mui 컴포넌트 툴
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
// 슬라이드 플러그인
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// 컴포넌트
import { showAlert, LoadingScreen } from './CustomAlert';

function JobNews() {
    // 뉴스데이터 상태
    const [news, setNews] = useState([]);
    // 직무 상태 컨텍스트
    const { job } = useQuestionContext();
    // 슬라이드 세팅
    const SlideSettings = {
        dots: true, // 하단에 슬라이드 점 표시
        infinite: true, // 무한 반복
        speed: 500, // 슬라이드 전환 속도
        slidesToShow: 3, // 한 번에 보여줄 슬라이드 수
        slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
        autoplay: true, // 자동 슬라이드
        autoplaySpeed: 3000, // 자동 슬라이드 시간 간격 (3초)
        vertical: true, // 슬라이드 방향을 수직으로 설정
        arrows: false,
    };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`https://interview-c4s12l05c-dongbinkoos-projects.vercel.app/api/news?query=${job}`);
                const data = await response.json();
                setNews(data.articles || []);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, [job]);

    return (
        <div style={{ margin: '0 auto' }}>
            <Card
                style={{
                    backgroundColor: '#00000059',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    marginBottom: 'auto',
                }}
            >
                <CardContent sx={{ padding: '32px' }}>
                    <Typography variant="p" sx={{ fontSize: '12px', color: 'white' }}>
                        {job}관련
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'white',
                            marginBottom: '10px',
                            fontSize: '20px',
                            borderBottom: '0.5px solid white',
                            paddingBottom: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            fontWeight: '800',
                        }}
                    >
                        실시간 뉴스
                        <Typography
                            onClick={() => {
                                showAlert('Warning', '준비 중입니다.');
                            }}
                            variant="a"
                            sx={{
                                color: 'white',
                                fontSize: '12px',
                                cursor: 'pointer',
                            }}
                            className="Pretendard-r"
                        >
                            See All
                        </Typography>
                    </Typography>
                    <List>
                        {news.length === 0 && (
                            <Typography
                                className="Pretendard-r"
                                sx={{ color: 'white', margin: '15px 0', fontSize: '15px', fontWeight: 'thin' }}
                            >
                                현재는 관련 직무와 관련된 뉴스가 없습니다.
                            </Typography>
                        )}
                        <Slider {...SlideSettings}>
                            {news.map((article, index) => (
                                <Box
                                    sx={{
                                        margin: '5px 0',
                                        padding: '5px 10px',
                                        textAlign: 'left',
                                        backgroundColor: '#00000059',
                                        borderRadius: '5px',
                                    }}
                                    key={index}
                                >
                                    <Typography
                                        variant="p"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <ArticleIcon
                                            sx={{
                                                display: 'inline',
                                                marginRight: '10PX',
                                                color: '#999',
                                                fontSize: '20px',
                                            }}
                                        />
                                        <Typography
                                            component="a"
                                            className="Pretendard-r"
                                            href={article.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                fontSize: '14px',
                                                textDecoration: 'none',
                                                display: 'block',
                                                textAlign: 'right',
                                                margin: '10px 0 ',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                color: 'white',
                                            }}
                                        >
                                            {article.title}
                                        </Typography>
                                    </Typography>
                                </Box>
                            ))}
                        </Slider>
                    </List>
                </CardContent>
            </Card>
        </div>
    );
}

export default JobNews;
