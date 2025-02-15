const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const router = express.Router();

const GOOGLE_NEWS_API_KEY = process.env.NEWS_API_KEY; // .env 파일에서 API 키 가져오기
const GOOGLE_NEWS_API_URL = 'https://newsapi.org/v2/everything';

router.get('/news', async (req, res) => {
    try {
        const { query } = req.query;
        console.log('Received query:', query); // 쿼리값 확인

        // 쿼리 파라미터가 없으면 에러 처리
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        // 뉴스 API 호출
        const response = await fetch(
            `${GOOGLE_NEWS_API_URL}?q=${encodeURIComponent(query)}&apiKey=${GOOGLE_NEWS_API_KEY}&language=ko&pageSize=4`
        );

        // 뉴스 API 응답 상태 확인
        if (!response.ok) {
            throw new Error(`Failed to fetch news: ${response.statusText}`);
        }

        // 응답 데이터를 클라이언트에 반환
        const data = await response.json();
        res.json(data); // 클라이언트에 뉴스 데이터 응답
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ error: 'Failed to fetch news' }); // 에러 응답
    }
});

module.exports = router;
