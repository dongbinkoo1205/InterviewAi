// 환경 변수 설정
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');

// ✅ Railway MySQL 연결 설정
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// ✅ 데이터베이스 연결 확인
db.getConnection()
    .then(() => console.log('✅ MySQL 데이터베이스 연결 성공'))
    .catch((err) => console.error('❌ MySQL 연결 실패:', err));

// ✅ 회원가입 API
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body; // 클라이언트에서 이메일과 비밀번호 받기

    try {
        // 1️⃣ 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 10);

        // 2️⃣ MySQL에 사용자 정보 저장
        await db.execute('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [
            email,
            hashedPassword,
            name || '사용자',
        ]);

        res.status(201).json({ message: '✅ 회원가입 성공!' });
    } catch (error) {
        console.error('❌ 회원가입 오류:', error);
        res.status(500).json({ error: '❌ 회원가입 실패!' });
    }
});

// ✅ 로그인 API
router.post('/login', async (req, res) => {
    console.log('📩 로그인 요청 데이터:', req.body); // 요청 데이터 확인

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: '이메일과 비밀번호를 입력해주세요.' });
    }

    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = users[0]; // 첫 번째 유저 선택

        if (!user) {
            return res.status(401).json({ message: '등록되지 않은 이메일입니다.' });
        }

        if (!user) {
            return res.status(401).json({ message: '등록되지 않은 이메일입니다.' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, 'SECRET_KEY', { expiresIn: '1h' });

        console.log('✅ 로그인 성공:', user);

        res.status(200).json({ message: '로그인 성공', user, token });
    } catch (error) {
        console.error('❌ 로그인 에러:', error);
        res.status(500).json({ message: '서버 오류' });
    }
});

module.exports = router;
