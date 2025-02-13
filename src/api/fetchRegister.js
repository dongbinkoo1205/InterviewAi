async function fetchRegister(name, email, password) {
    try {
        const response = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json(); // 🔹 response.json()을 한 번만 호출

        if (!response.ok) {
            throw new Error(data.message || '회원가입 실패');
        }

        console.log('✅ 회원가입 성공:', data);
        return data;
    } catch (error) {
        console.error('❌ 회원가입 오류:', error.message);
        return null; // ❗ API 요청 실패 시 null 반환 (호출하는 쪽에서 예외 처리 가능)
    }
}

export default fetchRegister;
