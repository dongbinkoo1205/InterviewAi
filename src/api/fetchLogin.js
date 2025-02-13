async function fetchLogin(email, password) {
    try {
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json(); // JSON 파싱

        if (!response.ok) {
            throw new Error(data.message || '로그인 실패');
        }

        console.log('✅ 로그인 성공:', data);
        return data;
    } catch (error) {
        console.error('❌ 로그인 오류:', error.message);
        return null; // ❗ 실패 시 null 반환
    }
}

export default fetchLogin;
