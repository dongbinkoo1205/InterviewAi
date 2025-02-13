const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const router = express.Router();

// OpenAI API 초기화
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // 환경 변수에서 API 키 가져오기
});

// OpenApi 사용
const openai = new OpenAIApi(configuration);

router.post('/generate-questions', async (req, res) => {
    console.log('Received request:', req.body);
    const { job } = req.body;

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content:
                        '당신은 면접 전문가이며, 모든 응답은 반드시 한국어로 작성되어야 합니다. 또한, 다음 응답부터는 질문만 응답되어야합니다.',
                },
                {
                    role: 'user',
                    content: `직업 "${job}"에 대한 면접 질문 3개를 만들어 주세요.`,
                },
            ],
            max_tokens: 300,
        });

        console.log('OpenAI response:', response.data);
        res.json({ questions: response.data.choices[0].message.content.split('\n') });
    } catch (error) {
        console.error('Error generating questions:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to generate questions' });
    }
});

module.exports = router;
