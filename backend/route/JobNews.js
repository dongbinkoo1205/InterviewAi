const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const router = express.Router();

const GOOGLE_NEWS_API_KEY = process.env.NEWS_API_KEY; // .env 파일에서 API 키 가져오기
const GOOGLE_NEWS_API_URL = 'https://newsapi.org/v2/everything';

// 뉴스 데이터 요청 라우트
router.get('/news', async (req, res) => {
    try {
        const { query } = req.query;
        console.log('Received query:', query); // 로그 추가
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        // Node.js 기본 fetch API 사용
        const response = await fetch(
            `${GOOGLE_NEWS_API_URL}?q=${encodeURIComponent(query)}&apiKey=${GOOGLE_NEWS_API_KEY}&language=ko&pageSize=4`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch news: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

module.exports = router;
