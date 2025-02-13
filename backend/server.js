// 환경 변수 설정
require('dotenv').config();

// Express 설정
const express = require('express');
const app = express();
app.use(express.json());

// 보안 및 CORS 설정
const cors = require('cors');

const loginRoutes = require('./route/login'); // 회원가입 라우트
const openApiRoutes = require('./route/openApi'); // 인터뷰 질문 라우트
const interviewResultRoutes = require('./route/interviewResult'); // 인터뷰 답변 라우트
const jobNewsRoutes = require('./route/JobNews'); // 직무 뉴스 라우트

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type'],
        credentials: true,
    })
);
app.use('/auth', loginRoutes);
app.use('/api', openApiRoutes);
app.use('/api', interviewResultRoutes);
app.use('/api', jobNewsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
