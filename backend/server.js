const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(
    cors({
        origin: [
            'https://interview-ai-omega.vercel.app', // 배포된 프론트엔드 도메인 추가
            'http://localhost:5173', // 개발 환경 (로컬에서 테스트 중일 경우)
        ],
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true, // 인증 정보 포함
    })
);

// 프리플라이트 요청 수동 처리 (옵션)
app.options('*', cors());

// ✅ JSON 요청을 처리하도록 설정
app.use(express.json());

// ✅ 로그 미들웨어 추가 (디버깅 용도)
app.use((req, res, next) => {
    console.log(`📌 [${req.method}] ${req.path} 요청 받음`);
    next();
});

// ✅ 라우트 불러오기
const loginRoutes = require('./route/login'); // 로그인 관련 라우트
const openApiRoutes = require('./route/openApi'); // 인터뷰 질문 라우트
const interviewResultRoutes = require('./route/interviewResult'); // 인터뷰 답변 라우트
const jobNewsRoutes = require('./route/JobNews'); // 직무 뉴스 라우트

// ✅ API 라우트 등록
app.use('/auth', loginRoutes);
app.use('/api/openai', openApiRoutes);
app.use('/api/interview', interviewResultRoutes);
app.use('/api/jobnews', jobNewsRoutes);

// ✅ 서버 실행
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🔗 API is live at: ${process.env.RENDER_EXTERNAL_URL || 'http://localhost:' + PORT}`);
});
app.use((req, res, next) => {
    console.log('Received request:', req.method, req.path); // 로그 추가
    next();
});
