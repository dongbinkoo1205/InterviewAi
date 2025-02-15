// 환경 변수 설정
require('dotenv').config();

// Express 설정
const express = require('express');
const app = express();
app.use(express.json());

// 보안 및 CORS 설정
const cors = require('cors');

// CORS 설정
app.use(
    cors({
        origin: [
            'http://localhost:5173', // 개발 환경
            'https://interview-ai-omega.vercel.app', // ✅ Vercel에 배포된 프론트엔드 URL
        ],
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type'],
        credentials: true,
    })
);

// 라우트 불러오기
const loginRoutes = require('./route/login'); // 로그인 관련 라우트
const openApiRoutes = require('./route/openApi'); // 인터뷰 질문 라우트
const interviewResultRoutes = require('./route/interviewResult'); // 인터뷰 답변 라우트
const jobNewsRoutes = require('./route/JobNews'); // 직무 뉴스 라우트

// API 라우트 등록
app.use('/auth', loginRoutes); // 로그인 관련 엔드포인트
app.use('/api/openai', openApiRoutes); // 인터뷰 질문 API
app.use('/api/interview', interviewResultRoutes); // 인터뷰 결과 API
app.use('/api/jobnews', jobNewsRoutes); // 직무 뉴스 API

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🔗 API is live at: ${process.env.RENDER_EXTERNAL_URL || 'http://localhost:' + PORT}`);
});
