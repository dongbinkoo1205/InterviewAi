// backend/routes/interviewResult.js

const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const router = express.Router();

// OpenAI API 초기화
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // 환경 변수에서 API 키 가져오기
});
const openai = new OpenAIApi(configuration);

// 면접 답변 평가 API
router.post('/evaluate-answers', async (req, res) => {
    console.log('Received evaluation request:', req.body);
    const { answers, questions } = req.body;

    if (!answers || !questions || answers.length !== questions.length) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    try {
        const newScores = {};
        for (let i = 0; i < answers.length; i++) {
            const response = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `
                        You are an AI that evaluates user interview answers. 
                        Provide a response in strict JSON format with scores (from 1 to 10) for the following criteria: 
                        Logic, Clarity, Professionalism, Confidence, Persuasiveness, and Grammar. 
                        The JSON should look like this: 
                        {"Logic": 1, "Clarity": 2, "Professionalism": 3, "Confidence": 4, "Persuasiveness": 5, "Grammar": 6}
                        Do not add any additional text before or after the JSON.
                        `,
                    },
                    { role: 'user', content: `Evaluate my answer: "${answers[i]}"` },
                ],
                response_format: { type: 'json_object' },
            });

            const aiResponse = response.data?.choices?.[0]?.message?.content;
            if (!aiResponse) {
                return res.status(500).json({ error: 'Invalid response from OpenAI' });
            }
            newScores[questions[i]] = JSON.parse(aiResponse);
        }
        res.json({ scores: newScores });
    } catch (error) {
        console.error('Error evaluating answers:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to evaluate answers' });
    }
});

module.exports = router;
